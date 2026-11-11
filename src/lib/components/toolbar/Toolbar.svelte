<script>
  import { agenda } from '../../stores/agenda.svelte.js';
  import IconButton from '../ui/IconButton.svelte';
  import ViewSwitcher from './ViewSwitcher.svelte';
  import SearchBox from './SearchBox.svelte';
</script>

<header class="toolbar">
  <div class="acciones">
    <IconButton
      icon="calendario"
      label="Mostrar calendarios"
      pressed={agenda.barraLateralAbierta}
      onclick={() => agenda.alternarBarraLateral()}
    />
    <IconButton icon="mas" label="Nuevo evento" onclick={() => agenda.abrirNuevo()} />
  </div>

  <ViewSwitcher />
  <SearchBox />
</header>

<style>
  .toolbar {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 12px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--linea);
  }
  .acciones {
    display: flex;
    gap: 6px;
  }
  @media (max-width: 760px) {
    .toolbar {
      grid-template-columns: auto 1fr;
    }
    .toolbar :global(.busqueda) {
      grid-column: 1 / -1;
      justify-self: stretch;
    }
  }
</style>
