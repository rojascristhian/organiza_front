<script>
  import { calendarStore } from '../../stores/calendar.svelte.js';
  import { t } from '../../i18n/i18n.svelte.js';
  import IconButton from '../ui/IconButton.svelte';
  import ViewSwitcher from './ViewSwitcher.svelte';
  import SearchBox from './SearchBox.svelte';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
</script>

<header class="toolbar">
  <div class="actions">
    <IconButton
      icon="calendar"
      label={t('toolbar.showCalendars')}
      pressed={calendarStore.sidebarOpen}
      onclick={() => calendarStore.toggleSidebar()}
    />
    <IconButton icon="plus" label={t('toolbar.newTask')} onclick={() => calendarStore.openNewEvent()} />
  </div>

  <ViewSwitcher />

  <div class="end">
    <SearchBox />
    <LanguageSwitcher />
  </div>
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
  .end {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  @media (max-width: 760px) {
    .toolbar {
      grid-template-columns: auto 1fr;
    }
    .end {
      grid-column: 1 / -1;
    }
    .end :global(.search) {
      max-width: none;
    }
  }
</style>
