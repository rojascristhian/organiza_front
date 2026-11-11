// Datos iniciales. Los eventos de demo se generan en el mes actual para que
// la primera vez que abras la app el calendario no se vea vacío.
import { claveFecha } from '../utils/dates.js';

export function calendariosIniciales() {
  return [
    { id: 'casa', nombre: 'Casa', color: '#d6e03a', grupo: 'icloud', visible: true, editable: true },
    { id: 'calendario', nombre: 'Calendario', color: '#40b4f5', grupo: 'icloud', visible: true, editable: true },
    { id: 'cumple-icloud', nombre: 'Calendario de cumpleaños', color: '#ff9f0a', grupo: 'icloud', visible: true, editable: true },
    { id: 'examenes', nombre: 'Exámenes y Entregas', color: '#bf5af2', grupo: 'icloud', visible: true, editable: true },
    { id: 'festivos', nombre: 'Días festivos (México)', detalle: 'Suscripciones', color: '#30d158', grupo: 'otros', visible: true, editable: false },
    { id: 'cumpleanos', nombre: 'Cumpleaños', color: '#8e9bb5', grupo: 'otros', visible: true, editable: false },
    { id: 'siri', nombre: 'Sugerencias de Siri', color: '#8e9bb5', grupo: 'otros', visible: true, editable: false },
  ];
}

export function crearEventosDemo(anio, mes) {
  const ultimo = new Date(anio, mes + 1, 0).getDate();
  const f = (dia) => claveFecha(new Date(anio, mes, Math.min(dia, ultimo)));
  let n = 0;
  const ev = (titulo, dia, calendarioId, extra = {}) => ({
    id: `demo-${++n}`,
    titulo,
    fecha: f(dia),
    calendarioId,
    todoElDia: true,
    hora: '',
    notas: '',
    ...extra,
  });

  return [
    ev('Revisión de gastos', 1, 'casa'),
    ev('Día festivo de ejemplo', 4, 'festivos'),
    ev('Kahoot', 8, 'examenes', { todoElDia: false, hora: '16:00' }),
    ev('2do parcial', 12, 'examenes', { todoElDia: false, hora: '10:00' }),
    ev('Quiz 2', 13, 'examenes', { todoElDia: false, hora: '16:00' }),
    ev('Tarea', 14, 'examenes', { todoElDia: false, hora: '16:00' }),
    ev('Kahoot', 16, 'examenes', { todoElDia: false, hora: '08:30' }),
    ev('Día internacional', 30, 'festivos'),
    ev('Kahoot', 30, 'examenes', { todoElDia: false, hora: '16:00' }),
  ];
}
