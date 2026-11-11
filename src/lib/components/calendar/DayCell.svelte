<script>
  import { agenda } from '../../stores/agenda.svelte.js';
  import { fechaLarga } from '../../utils/dates.js';
  import EventChip from './EventChip.svelte';

  let { dia, eventos } = $props();

  const crear = () => agenda.abrirNuevo(dia.clave);
</script>

<div class="celda" class:fuera={!dia.delMes} role="presentation" ondblclick={crear}>
  <div class="numero-fila">
    <button
      type="button"
      class="numero"
      class:hoy={dia.esHoy}
      aria-label={`Nuevo evento el ${fechaLarga(dia.fecha)}`}
      onclick={crear}
    >
      {dia.fecha.getDate()}
    </button>
  </div>

  <ul class="eventos">
    {#each eventos as evento (evento.id)}
      <li><EventChip {evento} /></li>
    {/each}
  </ul>
</div>

<style>
  .celda {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    padding: 3px;
    border-right: 1px solid var(--linea);
    border-bottom: 1px solid var(--linea);
  }
  .celda:nth-child(7n) {
    border-right: 0;
  }
  .numero-fila {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 2px;
  }
  .numero {
    min-width: 24px;
    height: 24px;
    padding: 0 4px;
    border-radius: 12px;
    font-size: 15px;
    color: var(--texto-suave);
  }
  .fuera .numero {
    color: var(--texto-tenue);
  }
  .numero.hoy {
    background: var(--acento);
    color: #fff;
    font-weight: 600;
  }
  .eventos {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: none;
  }
  .eventos::-webkit-scrollbar {
    display: none;
  }
</style>
