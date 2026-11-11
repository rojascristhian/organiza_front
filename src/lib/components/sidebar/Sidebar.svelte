<script>
  import CalendarGroup from './CalendarGroup.svelte';
</script>

<aside class="sidebar" aria-label="Calendarios">
  <CalendarGroup title="iCloud" group="icloud" canHideAll />
  <CalendarGroup title="Otros" group="other" />
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
    border-right: 1px solid var(--line);
    background: var(--bg);
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
