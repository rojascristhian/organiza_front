// Date helpers. Everything works in local time and with "YYYY-MM-DD" keys.

const LOCALE = 'es';

// Weekday labels shown in the UI (the week starts on Sunday).
export const WEEKDAY_LABELS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

export function today() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function fromDateKey(key) {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function isSameDay(a, b) {
  return dateKey(a) === dateKey(b);
}

/** First day of the month you get by adding `amount` months to `date`. */
export function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function monthName(date) {
  return new Intl.DateTimeFormat(LOCALE, { month: 'long' }).format(date);
}

export function longDate(date) {
  return new Intl.DateTimeFormat(LOCALE, { dateStyle: 'long' }).format(date);
}

/** 42 cells (6 weeks, starting on Sunday) used to draw one month. */
export function buildMonthGrid(date) {
  const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const start = new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), 1 - firstOfMonth.getDay());
  const current = today();

  return Array.from({ length: 42 }, (_, index) => {
    const cellDate = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index);
    return {
      date: cellDate,
      key: dateKey(cellDate),
      inMonth: cellDate.getMonth() === date.getMonth(),
      isToday: isSameDay(cellDate, current),
    };
  });
}
