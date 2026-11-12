<script>
  import { i18n } from '../../i18n/i18n.svelte.js';
  import { getWeekdayLabels } from '../../utils/dates.js';

  const labels = $derived(getWeekdayLabels(i18n.locale));
</script>

<div class="row" aria-hidden="true">
  {#each labels as label, index (index)}
    <span>{label}</span>
  {/each}
</div>

<style>
  .row {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  span {
    padding: 6px 8px;
    text-align: right;
    font-size: 13px;
    color: var(--text-muted);
  }
</style>
