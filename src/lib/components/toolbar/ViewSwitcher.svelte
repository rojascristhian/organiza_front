<script>
  import { calendarStore } from '../../stores/calendar.svelte.js';
  import { t } from '../../i18n/i18n.svelte.js';

  const viewIds = ['day', 'week', 'month', 'year'];
</script>

<div class="switcher" role="group" aria-label={t('views.label')}>
  {#each viewIds as id (id)}
    <button type="button" aria-pressed={calendarStore.view === id} onclick={() => calendarStore.setView(id)}>
      {t(`views.${id}`)}
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
