<script>
  import { DIAS_SEMANA } from '../../utils/dates.js';
</script>

<div class="fila" aria-hidden="true">
  {#each DIAS_SEMANA as dia (dia)}
    <span>{dia}</span>
  {/each}
</div>

<style>
  .fila {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    border-top: 1px solid var(--linea);
    border-bottom: 1px solid var(--linea);
  }
  span {
    padding: 6px 8px;
    text-align: right;
    font-size: 13px;
    color: var(--texto-suave);
  }
</style>
