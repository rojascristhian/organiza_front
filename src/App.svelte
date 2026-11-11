<script>
  import { agenda } from './lib/stores/agenda.svelte.js';
  import Toolbar from './lib/components/toolbar/Toolbar.svelte';
  import Sidebar from './lib/components/sidebar/Sidebar.svelte';
  import CalendarHeader from './lib/components/calendar/CalendarHeader.svelte';
  import MonthView from './lib/components/calendar/MonthView.svelte';
  import ViewPlaceholder from './lib/components/calendar/ViewPlaceholder.svelte';
  import EventDialog from './lib/components/events/EventDialog.svelte';
</script>

<div class="app">
  <Toolbar />

  <div class="cuerpo">
    {#if agenda.barraLateralAbierta}
      <Sidebar />
    {/if}

    <main class="principal">
      <CalendarHeader />
      {#if agenda.vista === 'mes'}
        <MonthView />
      {:else}
        <ViewPlaceholder vista={agenda.vista} />
      {/if}
    </main>
  </div>

  {#if agenda.editor}
    <EventDialog />
  {/if}
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100dvh;
  }
  .cuerpo {
    position: relative;
    flex: 1;
    display: flex;
    min-height: 0;
  }
  .principal {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
</style>
