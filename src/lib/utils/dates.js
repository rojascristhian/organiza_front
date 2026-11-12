// Date helpers. Everything works in local time and with "YYYY-MM-DD" keys.
// Functions that produce text receive the locale ('es', 'en', ...) as an argument.

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

export function monthName(date, locale) {
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
}

export function longDate(date, locale) {
  return new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date);
}

/** Short weekday labels, Sunday first (the month grid starts on Sunday). */
export function getWeekdayLabels(locale) {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  // August 1st, 2021 was a Sunday.
  return Array.from({ length: 7 }, (_, index) => formatter.format(new Date(2021, 7, 1 + index)));
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
