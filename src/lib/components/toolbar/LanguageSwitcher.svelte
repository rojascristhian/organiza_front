<script>
  import { i18n, t } from '../../i18n/i18n.svelte.js';
  import { LOCALES } from '../../i18n/translations.js';
  import Icon from '../ui/Icon.svelte';
</script>

<label class="language">
  <Icon name="globe" size={16} />
  <select aria-label={t('toolbar.language')} value={i18n.locale} onchange={(e) => i18n.setLocale(e.currentTarget.value)}>
    {#each LOCALES as locale (locale.code)}
      <option value={locale.code}>{locale.label}</option>
    {/each}
  </select>
</label>

<style>
  .language {
    flex: none;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 8px 6px 10px;
    background: var(--surface);
    border-radius: 10px;
    color: var(--text-muted);
  }
  select {
    background: none;
    border: 0;
    outline: 0;
    color: var(--text);
    font: inherit;
    font-size: 14px;
    cursor: pointer;
  }
</style>
