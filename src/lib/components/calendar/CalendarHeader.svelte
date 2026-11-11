<script>
  import { calendarStore } from '../../stores/calendar.svelte.js';
  import { monthName } from '../../utils/dates.js';
  import Icon from '../ui/Icon.svelte';

  const month = $derived(monthName(calendarStore.activeDate));
  const year = $derived(calendarStore.activeDate.getFullYear());
</script>

<div class="header">
  <h1><strong>{month}</strong> de {year}</h1>

  <nav aria-label="Navegación del calendario">
    <button type="button" class="arrow" aria-label="Mes anterior" onclick={() => calendarStore.shiftMonth(-1)}>
      <Icon name="left" size={18} />
    </button>
    <button type="button" class="today" onclick={() => calendarStore.goToToday()}>Hoy</button>
    <button type="button" class="arrow" aria-label="Mes siguiente" onclick={() => calendarStore.shiftMonth(1)}>
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
