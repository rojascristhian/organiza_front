// Estado global de la app (Svelte 5 runes dentro de una clase).
// Los componentes solo leen propiedades y llaman a métodos: no hay lógica de datos en ellos.
import { calendariosIniciales, crearEventosDemo } from '../data/seed.js';
import { hoy, claveFecha, sumarMeses } from '../utils/dates.js';

const CLAVE_ALMACEN = 'agenda:v1';

function leerAlmacen() {
  try {
    const bruto = localStorage.getItem(CLAVE_ALMACEN);
    return bruto ? JSON.parse(bruto) : null;
  } catch {
    return null;
  }
}

function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

// Todo el día primero; luego por hora; luego por título.
function compararEventos(a, b) {
  if (a.todoElDia !== b.todoElDia) return a.todoElDia ? -1 : 1;
  return (a.hora ?? '').localeCompare(b.hora ?? '') || a.titulo.localeCompare(b.titulo, 'es');
}

class Agenda {
  calendarios = $state([]);
  eventos = $state([]);
  vista = $state('mes'); // 'dia' | 'semana' | 'mes' | 'anio'
  fechaActiva = $state(hoy()); // cualquier día del mes visible
  busqueda = $state('');
  barraLateralAbierta = $state(true);
  editor = $state(null); // borrador del evento que se está creando o editando

  // Mapa "AAAA-MM-DD" -> eventos visibles de ese día (respeta calendarios ocultos y búsqueda).
  porDia = $derived.by(() => {
    const visibles = new Set(this.calendarios.filter((c) => c.visible).map((c) => c.id));
    const q = normalizar(this.busqueda);
    const mapa = new Map();

    for (const ev of this.eventos) {
      if (!visibles.has(ev.calendarioId)) continue;
      if (q && !normalizar(ev.titulo).includes(q)) continue;
      const lista = mapa.get(ev.fecha) ?? [];
      lista.push(ev);
      mapa.set(ev.fecha, lista);
    }
    for (const lista of mapa.values()) lista.sort(compararEventos);
    return mapa;
  });

  constructor() {
    const guardado = leerAlmacen();
    const base = hoy();
    this.calendarios = guardado?.calendarios ?? calendariosIniciales();
    this.eventos = guardado?.eventos ?? crearEventosDemo(base.getFullYear(), base.getMonth());
    this.barraLateralAbierta = window.innerWidth > 760;
  }

  /* ---------- Consultas ---------- */
  calendarioPorId(id) {
    return this.calendarios.find((c) => c.id === id);
  }

  eventosDelDia(clave) {
    return this.porDia.get(clave) ?? [];
  }

  /* ---------- Navegación ---------- */
  mover(meses) {
    this.fechaActiva = sumarMeses(this.fechaActiva, meses);
  }

  irAHoy() {
    this.fechaActiva = hoy();
  }

  cambiarVista(vista) {
    this.vista = vista;
  }

  alternarBarraLateral() {
    this.barraLateralAbierta = !this.barraLateralAbierta;
  }

  buscar(texto) {
    this.busqueda = texto;
  }

  /* ---------- Calendarios ---------- */
  alternarCalendario(id) {
    const cal = this.calendarioPorId(id);
    if (!cal) return;
    cal.visible = !cal.visible;
    this.guardar();
  }

  fijarVisibilidadGrupo(grupo, visible) {
    for (const cal of this.calendarios) {
      if (cal.grupo === grupo) cal.visible = visible;
    }
    this.guardar();
  }

  /* ---------- Editor de eventos ---------- */
  abrirNuevo(clave = claveFecha(hoy())) {
    const primero = this.calendarios.find((c) => c.editable);
    this.editor = {
      id: null,
      titulo: '',
      fecha: clave,
      todoElDia: false,
      hora: '09:00',
      calendarioId: primero?.id ?? '',
      notas: '',
    };
  }

  abrirEdicion(evento) {
    this.editor = { ...evento };
  }

  cerrarEditor() {
    this.editor = null;
  }

  guardarEvento(borrador) {
    const limpio = {
      ...borrador,
      titulo: borrador.titulo.trim() || 'Sin título',
      hora: borrador.todoElDia ? '' : borrador.hora,
    };

    if (limpio.id) {
      const i = this.eventos.findIndex((e) => e.id === limpio.id);
      if (i >= 0) this.eventos[i] = limpio;
    } else {
      this.eventos.push({ ...limpio, id: crypto.randomUUID() });
    }
    this.guardar();
  }

  eliminarEvento(id) {
    this.eventos = this.eventos.filter((e) => e.id !== id);
    this.guardar();
  }

  /* ---------- Persistencia ---------- */
  guardar() {
    try {
      localStorage.setItem(
        CLAVE_ALMACEN,
        JSON.stringify({
          calendarios: $state.snapshot(this.calendarios),
          eventos: $state.snapshot(this.eventos),
        }),
      );
    } catch {
      /* almacenamiento no disponible: la app sigue funcionando en memoria */
    }
  }
}

export const agenda = new Agenda();
