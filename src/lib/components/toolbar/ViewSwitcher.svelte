<script>
  import { calendarStore } from '../../stores/calendar.svelte.js';

  const views = [
    { id: 'day', label: 'Día' },
    { id: 'week', label: 'Semana' },
    { id: 'month', label: 'Mes' },
    { id: 'year', label: 'Año' },
  ];
</script>

<div class="switcher" role="group" aria-label="Tipo de vista">
  {#each views as view (view.id)}
    <button type="button" aria-pressed={calendarStore.view === view.id} onclick={() => calendarStore.setView(view.id)}>
      {view.label}
    </button>
  {/each}
</div>

<style>
  .switcher {
    display: inline-flex;
    padding: 2px;
    background: var(--surface);
    border-radius: 9px;
    justify-self: center;
  }
  button {
    padding: 5px 18px;
    border-radius: 7px;
    font-size: 13px;
  }
  button[aria-pressed='true'] {
    background: var(--selection);
  }
  @media (max-width: 760px) {
    button {
      padding: 5px 10px;
    }
  }
</style>
