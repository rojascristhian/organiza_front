<script>
  import { calendarStore } from '../../stores/calendar.svelte.js';
  import { t } from '../../i18n/i18n.svelte.js';
  import { buildMonthGrid } from '../../utils/dates.js';
  import WeekdayRow from './WeekdayRow.svelte';
  import DayCell from './DayCell.svelte';

  const days = $derived(buildMonthGrid(calendarStore.activeDate));
</script>

<section class="month" aria-label={t('month.label')}>
  <WeekdayRow />
  <div class="grid">
    {#each days as day (day.key)}
      <DayCell {day} events={calendarStore.getEventsForDay(day.key)} />
    {/each}
  </div>
</section>

<style>
  .month {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .grid {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    grid-template-rows: repeat(6, minmax(0, 1fr));
    min-height: 0;
  }
</style>
