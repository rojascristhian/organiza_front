<script>
  import { calendarStore } from '../../stores/calendar.svelte.js';
  import { t } from '../../i18n/i18n.svelte.js';
  import Icon from '../ui/Icon.svelte';
</script>

<label class="search">
  <Icon name="search" size={16} />
  <input
    type="search"
    placeholder={t('search.placeholder')}
    aria-label={t('search.label')}
    value={calendarStore.query}
    oninput={(e) => calendarStore.setQuery(e.currentTarget.value)}
  />
</label>

<style>
  .search {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    max-width: 240px;
    padding: 6px 10px;
    background: var(--surface);
    border-radius: 10px;
    color: var(--text-muted);
  }
  input {
    flex: 1;
    min-width: 0;
    background: none;
    border: 0;
    outline: 0;
    color: var(--text);
    font: inherit;
    font-size: 14px;
  }
  input::placeholder {
    color: var(--text-muted);
  }
</style>
