// Utilidades de fechas. Todas trabajan en hora local y con claves "AAAA-MM-DD".

export const DIAS_SEMANA = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

export function hoy() {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function claveFecha(fecha) {
  const a = fecha.getFullYear();
  const m = String(fecha.getMonth() + 1).padStart(2, '0');
  const d = String(fecha.getDate()).padStart(2, '0');
  return `${a}-${m}-${d}`;
}

export function desdeClave(clave) {
  const [a, m, d] = clave.split('-').map(Number);
  return new Date(a, m - 1, d);
}

export function mismoDia(a, b) {
  return claveFecha(a) === claveFecha(b);
}

/** Primer día del mes resultante de sumar `n` meses a `fecha`. */
export function sumarMeses(fecha, n) {
  return new Date(fecha.getFullYear(), fecha.getMonth() + n, 1);
}

export function nombreMes(fecha) {
  return new Intl.DateTimeFormat('es', { month: 'long' }).format(fecha);
}

export function fechaLarga(fecha) {
  return new Intl.DateTimeFormat('es', { dateStyle: 'long' }).format(fecha);
}

/** 42 celdas (6 semanas, empezando en domingo) para dibujar un mes. */
export function construirCuadriculaMes(fecha) {
  const primero = new Date(fecha.getFullYear(), fecha.getMonth(), 1);
  const inicio = new Date(primero.getFullYear(), primero.getMonth(), 1 - primero.getDay());
  const ahora = hoy();

  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate() + i);
    return {
      fecha: d,
      clave: claveFecha(d),
      delMes: d.getMonth() === fecha.getMonth(),
      esHoy: mismoDia(d, ahora),
    };
  });
}
