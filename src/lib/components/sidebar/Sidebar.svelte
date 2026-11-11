<script>
  import CalendarGroup from './CalendarGroup.svelte';
</script>

<aside class="sidebar" aria-label="Calendarios">
  <CalendarGroup titulo="iCloud" grupo="icloud" permiteOcultarTodo />
  <CalendarGroup titulo="Otros" grupo="otros" />
</aside>

<style>
  .sidebar {
    flex: none;
    width: 280px;
    padding: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 22px;
    border-right: 1px solid var(--linea);
    background: var(--fondo);
  }
  @media (max-width: 760px) {
    .sidebar {
      position: absolute;
      inset: 0 auto 0 0;
      z-index: 5;
      width: min(300px, 85vw);
    }
  }
</style>
