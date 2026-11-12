// All UI text lives here. To add a language, add one more block with the same keys
// and one more entry in LOCALES.

export const DEFAULT_LOCALE = 'es';

export const LOCALES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
];

export const translations = {
  es: {
    'toolbar.showCalendars': 'Mostrar calendarios',
    'toolbar.newTask': 'Nueva tarea',
    'toolbar.language': 'Idioma',

    'views.label': 'Tipo de vista',
    'views.day': 'Día',
    'views.week': 'Semana',
    'views.month': 'Mes',
    'views.year': 'Año',

    'search.placeholder': 'Buscar',
    'search.label': 'Buscar tareas',

    'sidebar.label': 'Calendarios',
    'groups.icloud': 'iCloud',
    'groups.other': 'Otros',
    'groups.hideAll': 'Ocultar todo',
    'groups.showAll': 'Mostrar todo',

    'calendars.home': 'Casa',
    'calendars.main': 'Calendario',
    'calendars.icloudBirthdays': 'Calendario de cumpleaños',
    'calendars.exams': 'Exámenes y Entregas',
    'calendars.holidays': 'Días festivos (México)',
    'calendars.subscriptions': 'Suscripciones',
    'calendars.birthdays': 'Cumpleaños',
    'calendars.siri': 'Sugerencias de Siri',

    'header.monthYear': '{month} de {year}',
    'header.navigation': 'Navegación del calendario',
    'header.previousMonth': 'Mes anterior',
    'header.nextMonth': 'Mes siguiente',
    'header.today': 'Hoy',

    'month.label': 'Vista mensual',
    'dayCell.newTask': 'Nueva tarea el {date}',

    'placeholder.notBuilt': 'La vista de {view} todavía no está construida.',
    'placeholder.hint': 'Cambia a «Mes» para ver el calendario.',

    'dialog.titleNew': 'Nueva tarea',
    'dialog.titleEdit': 'Editar tarea',
    'dialog.titleView': 'Tarea',
    'dialog.title': 'Título',
    'dialog.titlePlaceholder': 'Título de la tarea',
    'dialog.calendar': 'Calendario',
    'dialog.date': 'Fecha',
    'dialog.allDay': 'Todo el día',
    'dialog.time': 'Hora',
    'dialog.task': 'Tarea',
    'dialog.delete': 'Eliminar',
    'dialog.cancel': 'Cancelar',
    'dialog.close': 'Cerrar',
    'dialog.save': 'Guardar',
    'dialog.addCalendar': 'Añadir calendario',
    'dialog.newCalendarName': 'Nombre del calendario',
    'dialog.addCalendarConfirm': 'Añadir',
    'dialog.deleteCalendar': 'Eliminar calendario',
    'dialog.deleteCalendarConfirm': 'Se eliminará el calendario «{name}» y todas sus tareas. ¿Continuar?',

    'task.untitled': 'Sin título',

    'demo.expensesReview': 'Revisión de gastos',
    'demo.sampleHoliday': 'Día festivo de ejemplo',
    'demo.midterm': '2do parcial',
    'demo.homework': 'Tarea',
    'demo.internationalDay': 'Día internacional',
  },

  en: {
    'toolbar.showCalendars': 'Show calendars',
    'toolbar.newTask': 'New task',
    'toolbar.language': 'Language',

    'views.label': 'View type',
    'views.day': 'Day',
    'views.week': 'Week',
    'views.month': 'Month',
    'views.year': 'Year',

    'search.placeholder': 'Search',
    'search.label': 'Search tasks',

    'sidebar.label': 'Calendars',
    'groups.icloud': 'iCloud',
    'groups.other': 'Other',
    'groups.hideAll': 'Hide all',
    'groups.showAll': 'Show all',

    'calendars.home': 'Home',
    'calendars.main': 'Calendar',
    'calendars.icloudBirthdays': 'Birthday calendar',
    'calendars.exams': 'Exams and Deadlines',
    'calendars.holidays': 'Holidays (Mexico)',
    'calendars.subscriptions': 'Subscriptions',
    'calendars.birthdays': 'Birthdays',
    'calendars.siri': 'Siri Suggestions',

    'header.monthYear': '{month} {year}',
    'header.navigation': 'Calendar navigation',
    'header.previousMonth': 'Previous month',
    'header.nextMonth': 'Next month',
    'header.today': 'Today',

    'month.label': 'Month view',
    'dayCell.newTask': 'New task on {date}',

    'placeholder.notBuilt': 'The {view} view is not built yet.',
    'placeholder.hint': 'Switch to “Month” to see the calendar.',

    'dialog.titleNew': 'New task',
    'dialog.titleEdit': 'Edit task',
    'dialog.titleView': 'Task',
    'dialog.title': 'Title',
    'dialog.titlePlaceholder': 'Task title',
    'dialog.calendar': 'Calendar',
    'dialog.date': 'Date',
    'dialog.allDay': 'All day',
    'dialog.time': 'Time',
    'dialog.task': 'Task',
    'dialog.delete': 'Delete',
    'dialog.cancel': 'Cancel',
    'dialog.close': 'Close',
    'dialog.save': 'Save',
    'dialog.addCalendar': 'Add calendar',
    'dialog.newCalendarName': 'Calendar name',
    'dialog.addCalendarConfirm': 'Add',
    'dialog.deleteCalendar': 'Delete calendar',
    'dialog.deleteCalendarConfirm': 'The calendar “{name}” and all of its tasks will be deleted. Continue?',

    'task.untitled': 'Untitled',

    'demo.expensesReview': 'Expense review',
    'demo.sampleHoliday': 'Sample holiday',
    'demo.midterm': 'Second midterm',
    'demo.homework': 'Homework',
    'demo.internationalDay': 'International day',
  },
};
