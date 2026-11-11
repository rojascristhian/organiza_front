# Calendar App (Svelte 5 + Vite)

Calendar and task organizer with an Apple Calendar–style dark interface.

```bash
npm install
npm run dev
```

## Structure

```
src/
├─ main.js                        entry point
├─ App.svelte                     screen layout
├─ app.css                        design tokens (colors, font) and reset
└─ lib/
   ├─ stores/calendar.svelte.js   global state + persistence (localStorage)
   ├─ utils/dates.js              date helpers
   ├─ data/seed.js                sample calendars and events
   └─ components/
      ├─ ui/         Icon, IconButton
      ├─ toolbar/    Toolbar, ViewSwitcher, SearchBox
      ├─ sidebar/    Sidebar, CalendarGroup, CalendarItem
      ├─ calendar/   CalendarHeader, MonthView, WeekdayRow, DayCell, EventChip, ViewPlaceholder
      └─ events/     EventDialog
```
