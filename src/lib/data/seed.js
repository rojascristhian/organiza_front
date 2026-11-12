// Initial data. Built-in calendars use translation keys (nameKey / detailKey) so their
// names follow the selected language. Calendars created by the user have a plain `name`.
import { dateKey } from '../utils/dates.js';

export function initialCalendars() {
  return [
    { id: 'home', nameKey: 'calendars.home', color: '#d6e03a', group: 'icloud', visible: true, editable: true },
    { id: 'calendar', nameKey: 'calendars.main', color: '#40b4f5', group: 'icloud', visible: true, editable: true },
    { id: 'icloud-birthdays', nameKey: 'calendars.icloudBirthdays', color: '#ff9f0a', group: 'icloud', visible: true, editable: true },
    { id: 'exams', nameKey: 'calendars.exams', color: '#bf5af2', group: 'icloud', visible: true, editable: true },
    { id: 'holidays', nameKey: 'calendars.holidays', detailKey: 'calendars.subscriptions', color: '#30d158', group: 'other', visible: true, editable: false },
    { id: 'birthdays', nameKey: 'calendars.birthdays', color: '#8e9bb5', group: 'other', visible: true, editable: false },
    { id: 'siri', nameKey: 'calendars.siri', color: '#8e9bb5', group: 'other', visible: true, editable: false },
  ];
}

/**
 * Demo events generated in the given month so the calendar isn't empty on first run.
 * `translate` is the t() function; titles are translated once, when they are created.
 */
export function createDemoEvents(year, month, translate) {
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
    makeEvent(translate('demo.expensesReview'), 1, 'home'),
    makeEvent(translate('demo.sampleHoliday'), 4, 'holidays'),
    makeEvent('Kahoot', 8, 'exams', { allDay: false, time: '16:00' }),
    makeEvent(translate('demo.midterm'), 12, 'exams', { allDay: false, time: '10:00' }),
    makeEvent('Quiz 2', 13, 'exams', { allDay: false, time: '16:00' }),
    makeEvent(translate('demo.homework'), 14, 'exams', { allDay: false, time: '16:00' }),
    makeEvent('Kahoot', 16, 'exams', { allDay: false, time: '08:30' }),
    makeEvent(translate('demo.internationalDay'), 30, 'holidays'),
    makeEvent('Kahoot', 30, 'exams', { allDay: false, time: '16:00' }),
  ];
}
