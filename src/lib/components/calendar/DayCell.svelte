<script>
  import { calendarStore } from '../../stores/calendar.svelte.js';
  import { i18n, t } from '../../i18n/i18n.svelte.js';
  import { longDate } from '../../utils/dates.js';
  import EventChip from './EventChip.svelte';

  let { day, events } = $props();

  const createEvent = () => calendarStore.openNewEvent(day.key);
</script>

<div class="cell" class:outside={!day.inMonth} role="presentation" ondblclick={createEvent}>
  <div class="number-row">
    <button
      type="button"
      class="number"
      class:today={day.isToday}
      aria-label={t('dayCell.newTask', { date: longDate(day.date, i18n.locale) })}
      onclick={createEvent}
    >
      {day.date.getDate()}
    </button>
  </div>

  <ul class="events">
    {#each events as event (event.id)}
      <li><EventChip {event} /></li>
    {/each}
  </ul>
</div>

<style>
  .cell {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    padding: 3px;
    border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  .cell:nth-child(7n) {
    border-right: 0;
  }
  .number-row {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 2px;
  }
  .number {
    min-width: 24px;
    height: 24px;
    padding: 0 4px;
    border-radius: 12px;
    font-size: 15px;
    color: var(--text-muted);
  }
  .outside .number {
    color: var(--text-faint);
  }
  .number.today {
    background: var(--accent);
    color: #fff;
    font-weight: 600;
  }
  .events {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: none;
  }
  .events::-webkit-scrollbar {
    display: none;
  }
</style>
