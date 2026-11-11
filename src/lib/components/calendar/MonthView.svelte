<script>
  import { agenda } from '../../stores/agenda.svelte.js';
  import { construirCuadriculaMes } from '../../utils/dates.js';
  import WeekdayRow from './WeekdayRow.svelte';
  import DayCell from './DayCell.svelte';

  const dias = $derived(construirCuadriculaMes(agenda.fechaActiva));
</script>

<section class="mes" aria-label="Vista mensual">
  <WeekdayRow />
  <div class="cuadricula">
    {#each dias as dia (dia.clave)}
      <DayCell {dia} eventos={agenda.eventosDelDia(dia.clave)} />
    {/each}
  </div>
</section>

<style>
  .mes {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .cuadricula {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    grid-template-rows: repeat(6, minmax(0, 1fr));
    min-height: 0;
  }
</style>
