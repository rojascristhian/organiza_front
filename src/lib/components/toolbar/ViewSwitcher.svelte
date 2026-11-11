<script>
  import { agenda } from '../../stores/agenda.svelte.js';

  const vistas = [
    { id: 'dia', etiqueta: 'Día' },
    { id: 'semana', etiqueta: 'Semana' },
    { id: 'mes', etiqueta: 'Mes' },
    { id: 'anio', etiqueta: 'Año' },
  ];
</script>

<div class="selector" role="group" aria-label="Tipo de vista">
  {#each vistas as vista (vista.id)}
    <button type="button" aria-pressed={agenda.vista === vista.id} onclick={() => agenda.cambiarVista(vista.id)}>
      {vista.etiqueta}
    </button>
  {/each}
</div>

<style>
  .selector {
    display: inline-flex;
    padding: 2px;
    background: var(--superficie);
    border-radius: 9px;
    justify-self: center;
  }
  button {
    padding: 5px 18px;
    border-radius: 7px;
    font-size: 13px;
  }
  button[aria-pressed='true'] {
    background: var(--seleccion);
  }
  @media (max-width: 760px) {
    button {
      padding: 5px 10px;
    }
  }
</style>
