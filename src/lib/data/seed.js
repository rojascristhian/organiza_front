// Initial data. Demo events are generated in the current month so the
// calendar doesn't look empty the first time the app opens.
import { dateKey } from '../utils/dates.js';

export function initialCalendars() {
  return [
    { id: 'home', name: 'Casa', color: '#d6e03a', group: 'icloud', visible: true, editable: true },
    { id: 'calendar', name: 'Calendario', color: '#40b4f5', group: 'icloud', visible: true, editable: true },
    { id: 'icloud-birthdays', name: 'Calendario de cumpleaños', color: '#ff9f0a', group: 'icloud', visible: true, editable: true },
    { id: 'exams', name: 'Exámenes y Entregas', color: '#bf5af2', group: 'icloud', visible: true, editable: true },
    { id: 'holidays', name: 'Días festivos (México)', detail: 'Suscripciones', color: '#30d158', group: 'other', visible: true, editable: false },
    { id: 'birthdays', name: 'Cumpleaños', color: '#8e9bb5', group: 'other', visible: true, editable: false },
    { id: 'siri', name: 'Sugerencias de Siri', color: '#8e9bb5', group: 'other', visible: true, editable: false },
  ];
}

export function createDemoEvents(year, month) {
  const lastDay = new Date(year, month + 1, 0).getDate();
  const keyForDay = (day) => dateKey(new Date(year, month, Math.min(day, lastDay)));
  let counter = 0;

  const makeEvent = (title, day, calendarId, extra = {}) => ({
    id: `demo-${++counter}`,
    title,
    date: keyForDay(day),
    calendarId,
    allDay: true,
    time: '',
    notes: '',
    ...extra,
  });

  return [
    makeEvent('Revisión de gastos', 1, 'home'),
    makeEvent('Día festivo de ejemplo', 4, 'holidays'),
    makeEvent('Kahoot', 8, 'exams', { allDay: false, time: '16:00' }),
    makeEvent('2do parcial', 12, 'exams', { allDay: false, time: '10:00' }),
    makeEvent('Quiz 2', 13, 'exams', { allDay: false, time: '16:00' }),
    makeEvent('Tarea', 14, 'exams', { allDay: false, time: '16:00' }),
    makeEvent('Kahoot', 16, 'exams', { allDay: false, time: '08:30' }),
    makeEvent('Día internacional', 30, 'holidays'),
    makeEvent('Kahoot', 30, 'exams', { allDay: false, time: '16:00' }),
  ];
}
