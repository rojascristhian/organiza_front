// Global app state (Svelte 5 runes inside a class).
// Components only read properties and call methods: there is no data logic inside them.
import { initialCalendars, createDemoEvents } from '../data/seed.js';
import { today, dateKey, addMonths } from '../utils/dates.js';
import { i18n } from '../i18n/i18n.svelte.js';

const STORAGE_KEY = 'calendar-app:v1';

// Colors given, in order, to calendars created by the user.
const CUSTOM_CALENDAR_COLORS = ['#ff6482', '#64d2ff', '#ffd60a', '#ac8e68', '#5e5ce6', '#32d74b'];

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function normalize(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

// All-day events first; then by time; then by title.
function compareEvents(a, b) {
  if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
  return (a.time ?? '').localeCompare(b.time ?? '') || a.title.localeCompare(b.title);
}

// Data saved by an earlier version has plain names for built-in calendars.
// Re-attach their translation keys so they follow the selected language.
const builtInCalendars = new Map(initialCalendars().map((calendar) => [calendar.id, calendar]));

function withTranslationKeys(calendar) {
  const builtIn = builtInCalendars.get(calendar.id);
  if (!builtIn) return calendar;
  return { ...calendar, nameKey: builtIn.nameKey, detailKey: builtIn.detailKey };
}

class CalendarStore {
  calendars = $state([]);
  events = $state([]);
  view = $state('month'); // 'day' | 'week' | 'month' | 'year'
  activeDate = $state(today()); // any day inside the visible month
  query = $state('');
  sidebarOpen = $state(true);
  draft = $state(null); // the event being created or edited

  // Map "YYYY-MM-DD" -> visible events of that day (respects hidden calendars and search).
  eventsByDay = $derived.by(() => {
    const visibleIds = new Set(this.calendars.filter((c) => c.visible).map((c) => c.id));
    const query = normalize(this.query);
    const map = new Map();

    for (const event of this.events) {
      if (!visibleIds.has(event.calendarId)) continue;
      if (query && !normalize(event.title).includes(query)) continue;
      const list = map.get(event.date) ?? [];
      list.push(event);
      map.set(event.date, list);
    }
    for (const list of map.values()) list.sort(compareEvents);
    return map;
  });

  constructor() {
    const saved = readStorage();
    const now = today();
    this.calendars = (saved?.calendars ?? initialCalendars()).map(withTranslationKeys);
    this.events =
      saved?.events ?? createDemoEvents(now.getFullYear(), now.getMonth(), (key) => i18n.t(key));
    this.sidebarOpen = window.innerWidth > 760;
  }

  /* ---------- Queries ---------- */
  getCalendarById(id) {
    return this.calendars.find((c) => c.id === id);
  }

  /** Display name: translated for built-in calendars, as typed for custom ones. */
  getCalendarName(calendar) {
    if (!calendar) return '';
    return calendar.nameKey ? i18n.t(calendar.nameKey) : calendar.name;
  }

  getCalendarDetail(calendar) {
    return calendar?.detailKey ? i18n.t(calendar.detailKey) : '';
  }

  countEventsInCalendar(id) {
    return this.events.filter((e) => e.calendarId === id).length;
  }

  getEventsForDay(key) {
    return this.eventsByDay.get(key) ?? [];
  }

  /* ---------- Navigation ---------- */
  shiftMonth(amount) {
    this.activeDate = addMonths(this.activeDate, amount);
  }

  goToToday() {
    this.activeDate = today();
  }

  setView(view) {
    this.view = view;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setQuery(text) {
    this.query = text;
  }

  /* ---------- Calendars ---------- */
  toggleCalendar(id) {
    const calendar = this.getCalendarById(id);
    if (!calendar) return;
    calendar.visible = !calendar.visible;
    this.persist();
  }

  setGroupVisibility(group, visible) {
    for (const calendar of this.calendars) {
      if (calendar.group === group) calendar.visible = visible;
    }
    this.persist();
  }

  /** Creates a calendar from a typed name. Returns its id (the existing one if the name is taken). */
  addCalendar(name) {
    const clean = name.trim();
    if (!clean) return null;

    const existing = this.calendars.find(
      (c) => c.editable && normalize(this.getCalendarName(c)) === normalize(clean),
    );
    if (existing) return existing.id;

    const customCount = this.calendars.filter((c) => c.custom).length;
    const calendar = {
      id: crypto.randomUUID(),
      name: clean,
      color: CUSTOM_CALENDAR_COLORS[customCount % CUSTOM_CALENDAR_COLORS.length],
      group: 'icloud',
      visible: true,
      editable: true,
      custom: true,
    };
    this.calendars.push(calendar);
    this.persist();
    return calendar.id;
  }

  /** Only calendars created by the user can be deleted. Their tasks are deleted with them. */
  deleteCalendar(id) {
    const calendar = this.getCalendarById(id);
    if (!calendar?.custom) return;
    this.calendars = this.calendars.filter((c) => c.id !== id);
    this.events = this.events.filter((e) => e.calendarId !== id);
    this.persist();
  }

  /* ---------- Event editor ---------- */
  openNewEvent(key = dateKey(today())) {
    const firstEditable = this.calendars.find((c) => c.editable);
    this.draft = {
      id: null,
      title: '',
      date: key,
      allDay: false,
      time: '09:00',
      calendarId: firstEditable?.id ?? '',
      notes: '',
    };
  }

  openEditEvent(event) {
    this.draft = { ...event };
  }

  closeEditor() {
    this.draft = null;
  }

  saveEvent(draft) {
    const clean = {
      ...draft,
      title: draft.title.trim() || i18n.t('task.untitled'),
      time: draft.allDay ? '' : draft.time,
    };

    if (clean.id) {
      const index = this.events.findIndex((e) => e.id === clean.id);
      // If the task's calendar was deleted while editing, saving puts it back.
      if (index >= 0) this.events[index] = clean;
      else this.events.push(clean);
    } else {
      this.events.push({ ...clean, id: crypto.randomUUID() });
    }
    this.persist();
  }

  deleteEvent(id) {
    this.events = this.events.filter((e) => e.id !== id);
    this.persist();
  }

  /* ---------- Persistence ---------- */
  persist() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          calendars: $state.snapshot(this.calendars),
          events: $state.snapshot(this.events),
        }),
      );
    } catch {
      /* storage unavailable: the app keeps working in memory */
    }
  }
}

export const calendarStore = new CalendarStore();
