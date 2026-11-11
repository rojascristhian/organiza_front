<script>
  import { calendarStore } from '../../stores/calendar.svelte.js';
  import CalendarItem from './CalendarItem.svelte';

  let { title, group, canHideAll = false } = $props();

  const calendars = $derived(calendarStore.calendars.filter((c) => c.group === group));
  const allHidden = $derived(calendars.every((c) => !c.visible));
</script>

<section>
  <header>
    <h2>{title}</h2>
    {#if canHideAll}
      <button type="button" onclick={() => calendarStore.setGroupVisibility(group, allHidden)}>
        {allHidden ? 'Mostrar todo' : 'Ocultar todo'}
      </button>
    {/if}
  </header>

  <ul>
    {#each calendars as calendar (calendar.id)}
      <li><CalendarItem {calendar} /></li>
    {/each}
  </ul>
</section>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0 4px 6px;
    font-size: 12px;
  }
  h2 {
    font-size: 12px;
    font-weight: 400;
    color: var(--text-muted);
    text-transform: uppercase;
  }
  header button {
    font-size: 12px;
    color: var(--accent);
    text-transform: uppercase;
  }
  ul {
    background: var(--surface);
    border-radius: 10px;
    overflow: hidden;
  }
  li {
    position: relative;
  }
  /* Divider that starts after the color mark */
  li + li::before {
    content: '';
    position: absolute;
    top: 0;
    left: 46px;
    right: 0;
    height: 1px;
    background: var(--line-strong);
  }
</style>
