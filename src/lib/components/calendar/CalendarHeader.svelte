<script>
  import { calendarStore } from '../../stores/calendar.svelte.js';
  import { i18n, t } from '../../i18n/i18n.svelte.js';
  import { monthName } from '../../utils/dates.js';
  import Icon from '../ui/Icon.svelte';

  const MONTH_MARKER = '{month}';

  const month = $derived(monthName(calendarStore.activeDate, i18n.locale));
  const year = $derived(calendarStore.activeDate.getFullYear());

  // The title pattern depends on the language ("noviembre de 2026" / "November 2026").
  // Split around the month so only the month name is bold.
  const titleParts = $derived(t('header.monthYear', { month: MONTH_MARKER, year }).split(MONTH_MARKER));
</script>

<div class="header">
  <h1>{titleParts[0]}<strong>{month}</strong>{titleParts[1]}</h1>

  <nav aria-label={t('header.navigation')}>
    <button type="button" class="arrow" aria-label={t('header.previousMonth')} onclick={() => calendarStore.shiftMonth(-1)}>
      <Icon name="left" size={18} />
    </button>
    <button type="button" class="today" onclick={() => calendarStore.goToToday()}>{t('header.today')}</button>
    <button type="button" class="arrow" aria-label={t('header.nextMonth')} onclick={() => calendarStore.shiftMonth(1)}>
      <Icon name="right" size={18} />
    </button>
  </nav>
</div>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px 8px;
  }
  h1 {
    font-size: 26px;
    font-weight: 400;
  }
  h1 strong {
    font-weight: 700;
  }
  nav {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--accent);
  }
  .today {
    padding: 4px 10px;
    font-size: 16px;
    color: var(--accent);
  }
  .arrow {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    color: var(--accent);
  }
  .arrow:hover {
    background: var(--surface);
  }
</style>
