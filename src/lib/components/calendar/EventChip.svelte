<script>
  import { calendarStore } from '../../stores/calendar.svelte.js';

  let { event } = $props();

  const color = $derived(calendarStore.getCalendarById(event.calendarId)?.color ?? '#8e8e93');

  function open(e) {
    e.stopPropagation();
    calendarStore.openEditEvent(event);
  }
</script>

<button
  type="button"
  class="chip"
  class:all-day={event.allDay}
  style:--color={color}
  title={event.title}
  onclick={open}
>
  {#if !event.allDay}<span class="dot"></span>{/if}
  <span class="title">{event.title}</span>
  {#if !event.allDay}<time>{event.time}</time>{/if}
</button>

<style>
  .chip {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    min-width: 0;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 11px;
    line-height: 1.4;
    text-align: left;
  }
  .chip.all-day {
    background: color-mix(in srgb, var(--color) 28%, #000);
    color: color-mix(in srgb, var(--color) 65%, #fff);
  }
  .dot {
    flex: none;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--color);
  }
  .title {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  time {
    flex: none;
    font-size: 10px;
    color: var(--text-muted);
  }
</style>
