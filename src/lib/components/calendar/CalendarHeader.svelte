<script>
  import { agenda } from '../../stores/agenda.svelte.js';
  import { nombreMes } from '../../utils/dates.js';
  import Icon from '../ui/Icon.svelte';

  const mes = $derived(nombreMes(agenda.fechaActiva));
  const anio = $derived(agenda.fechaActiva.getFullYear());
</script>

<div class="cabecera">
  <h1><strong>{mes}</strong> de {anio}</h1>

  <nav aria-label="Navegación del calendario">
    <button type="button" class="flecha" aria-label="Mes anterior" onclick={() => agenda.mover(-1)}>
      <Icon name="izquierda" size={18} />
    </button>
    <button type="button" class="hoy" onclick={() => agenda.irAHoy()}>Hoy</button>
    <button type="button" class="flecha" aria-label="Mes siguiente" onclick={() => agenda.mover(1)}>
      <Icon name="derecha" size={18} />
    </button>
  </nav>
</div>

<style>
  .cabecera {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px 8px;
  }
  h1 {
    font-size: 26px;
    font-weight: 400;
  }
  h1 strong {
    font-weight: 700;
  }
  nav {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--acento);
  }
  .hoy {
    padding: 4px 10px;
    font-size: 16px;
    color: var(--acento);
  }
  .flecha {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    color: var(--acento);
  }
  .flecha:hover {
    background: var(--superficie);
  }
</style>
