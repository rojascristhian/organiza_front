<script>
  import { agenda } from '../../stores/agenda.svelte.js';
  import Icon from '../ui/Icon.svelte';

  let { cal } = $props();
</script>

<button
  class="item"
  type="button"
  aria-pressed={cal.visible}
  onclick={() => agenda.alternarCalendario(cal.id)}
>
  <span class="marca" class:apagada={!cal.visible} style:--color={cal.color}>
    {#if cal.visible}<Icon name="check" size={13} />{/if}
  </span>
  <span class="texto">
    <span class="nombre">{cal.nombre}</span>
    {#if cal.detalle}<span class="detalle">{cal.detalle}</span>{/if}
  </span>
</button>

<style>
  .item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 12px;
    text-align: left;
  }
  .marca {
    flex: none;
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--color);
    border: 2px solid var(--color);
    color: #000;
  }
  .marca.apagada {
    background: transparent;
  }
  .texto {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 1px;
  }
  .nombre {
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .detalle {
    font-size: 11px;
    color: var(--texto-suave);
  }
</style>
