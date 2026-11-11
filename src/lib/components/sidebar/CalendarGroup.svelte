<script>
  import { agenda } from '../../stores/agenda.svelte.js';
  import CalendarItem from './CalendarItem.svelte';

  let { titulo, grupo, permiteOcultarTodo = false } = $props();

  const calendarios = $derived(agenda.calendarios.filter((c) => c.grupo === grupo));
  const todosOcultos = $derived(calendarios.every((c) => !c.visible));
</script>

<section>
  <header>
    <h2>{titulo}</h2>
    {#if permiteOcultarTodo}
      <button type="button" onclick={() => agenda.fijarVisibilidadGrupo(grupo, todosOcultos)}>
        {todosOcultos ? 'Mostrar todo' : 'Ocultar todo'}
      </button>
    {/if}
  </header>

  <ul>
    {#each calendarios as cal (cal.id)}
      <li><CalendarItem {cal} /></li>
    {/each}
  </ul>
</section>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0 4px 6px;
    font-size: 12px;
  }
  h2 {
    font-size: 12px;
    font-weight: 400;
    color: var(--texto-suave);
    text-transform: uppercase;
  }
  header button {
    font-size: 12px;
    color: var(--acento);
    text-transform: uppercase;
  }
  ul {
    background: var(--superficie);
    border-radius: 10px;
    overflow: hidden;
  }
  li {
    position: relative;
  }
  /* Separador que empieza después de la marca de color */
  li + li::before {
    content: '';
    position: absolute;
    top: 0;
    left: 46px;
    right: 0;
    height: 1px;
    background: var(--linea-fuerte);
  }
</style>
