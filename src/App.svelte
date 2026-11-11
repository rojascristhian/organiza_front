<script>
  import { calendarStore } from './lib/stores/calendar.svelte.js';
  import Toolbar from './lib/components/toolbar/Toolbar.svelte';
  import Sidebar from './lib/components/sidebar/Sidebar.svelte';
  import CalendarHeader from './lib/components/calendar/CalendarHeader.svelte';
  import MonthView from './lib/components/calendar/MonthView.svelte';
  import ViewPlaceholder from './lib/components/calendar/ViewPlaceholder.svelte';
  import EventDialog from './lib/components/events/EventDialog.svelte';
</script>

<div class="app">
  <Toolbar />

  <div class="body">
    {#if calendarStore.sidebarOpen}
      <Sidebar />
    {/if}

    <main class="main">
      <CalendarHeader />
      {#if calendarStore.view === 'month'}
        <MonthView />
      {:else}
        <ViewPlaceholder view={calendarStore.view} />
      {/if}
    </main>
  </div>

  {#if calendarStore.draft}
    <EventDialog />
  {/if}
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    height: 100dvh;
  }
  .body {
    position: relative;
    flex: 1;
    display: flex;
    min-height: 0;
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
</style>
