# Agenda (Svelte 5 + Vite)

Calendario y organizador de tareas con interfaz estilo Apple Calendar (modo oscuro).

```bash
npm install
npm run dev
```

## Estructura

```
src/
├─ main.js                      punto de entrada
├─ App.svelte                   composición de la pantalla
├─ app.css                      tokens (colores, fuente) y reset
└─ lib/
   ├─ stores/agenda.svelte.js   estado global + persistencia (localStorage)
   ├─ utils/dates.js            funciones de fechas
   ├─ data/seed.js              calendarios y eventos de ejemplo
   └─ components/
      ├─ ui/         Icon, IconButton
      ├─ toolbar/    Toolbar, ViewSwitcher, SearchBox
      ├─ sidebar/    Sidebar, CalendarGroup, CalendarItem
      ├─ calendar/   CalendarHeader, MonthView, WeekdayRow, DayCell, EventChip, ViewPlaceholder
      └─ events/     EventDialog
```
