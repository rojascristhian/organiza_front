<script>
  import { calendarStore } from '../../stores/calendar.svelte.js';
  import IconButton from '../ui/IconButton.svelte';
  import ViewSwitcher from './ViewSwitcher.svelte';
  import SearchBox from './SearchBox.svelte';
</script>

<header class="toolbar">
  <div class="actions">
    <IconButton
      icon="calendar"
      label="Mostrar calendarios"
      pressed={calendarStore.sidebarOpen}
      onclick={() => calendarStore.toggleSidebar()}
    />
    <IconButton icon="plus" label="Nuevo evento" onclick={() => calendarStore.openNewEvent()} />
  </div>

  <ViewSwitcher />
  <SearchBox />
</header>

<style>
  .toolbar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--line);
  }
  .actions {
    display: flex;
    gap: 6px;
  }
  @media (max-width: 760px) {
    .toolbar {
      grid-template-columns: auto 1fr;
    }
    .toolbar :global(.search) {
      grid-column: 1 / -1;
      justify-self: stretch;
    }
  }
</style>
