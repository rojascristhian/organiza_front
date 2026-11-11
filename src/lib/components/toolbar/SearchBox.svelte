<script>
  import { agenda } from '../../stores/agenda.svelte.js';
  import Icon from '../ui/Icon.svelte';
</script>

<label class="busqueda">
  <Icon name="buscar" size={16} />
  <input
    type="search"
    placeholder="Buscar"
    aria-label="Buscar eventos"
    value={agenda.busqueda}
    oninput={(e) => agenda.buscar(e.currentTarget.value)}
  />
</label>

<style>
  .busqueda {
    display: flex;
    align-items: center;
    gap: 6px;
    justify-self: end;
    width: min(240px, 100%);
    padding: 6px 10px;
    background: var(--superficie);
    border-radius: 10px;
    color: var(--texto-suave);
  }
  input {
    flex: 1;
    min-width: 0;
    background: none;
    border: 0;
    outline: 0;
    color: var(--texto);
    font: inherit;
    font-size: 14px;
  }
  input::placeholder {
    color: var(--texto-suave);
  }
</style>
