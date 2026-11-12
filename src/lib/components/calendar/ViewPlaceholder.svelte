<script>
  import { t } from '../../i18n/i18n.svelte.js';

  let { view } = $props();

  const viewName = $derived(t(`views.${view}`).toLowerCase());
</script>

<div class="empty">
  <p>{t('placeholder.notBuilt', { view: viewName })}</p>
  <p class="note">{t('placeholder.hint')}</p>
</div>

<style>
  .empty {
    flex: 1;
    display: grid;
    place-content: center;
    gap: 6px;
    text-align: center;
    color: var(--text-muted);
  }
  .note {
    font-size: 13px;
  }
</style>
