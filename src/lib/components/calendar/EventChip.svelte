<script>
  import { agenda } from '../../stores/agenda.svelte.js';

  let { evento } = $props();

  const color = $derived(agenda.calendarioPorId(evento.calendarioId)?.color ?? '#8e8e93');

  function abrir(e) {
    e.stopPropagation();
    agenda.abrirEdicion(evento);
  }
</script>

<button
  type="button"
  class="chip"
  class:completo={evento.todoElDia}
  style:--color={color}
  title={evento.titulo}
  onclick={abrir}
>
  {#if !evento.todoElDia}<span class="punto"></span>{/if}
  <span class="titulo">{evento.titulo}</span>
  {#if !evento.todoElDia}<time>{evento.hora}</time>{/if}
</button>

<style>
  .chip {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    min-width: 0;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 11px;
    line-height: 1.4;
    text-align: left;
  }
  .chip.completo {
    background: color-mix(in srgb, var(--color) 28%, #000);
    color: color-mix(in srgb, var(--color) 65%, #fff);
  }
  .punto {
    flex: none;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--color);
  }
  .titulo {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  time {
    flex: none;
    font-size: 10px;
    color: var(--texto-suave);
  }
</style>
