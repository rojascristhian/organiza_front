<script>
  let { view } = $props();

  const names = { day: 'día', week: 'semana', year: 'año' };
</script>

<div class="empty">
  <p>La vista de {names[view] ?? view} todavía no está construida.</p>
  <p class="note">Cambia a «Mes» para ver el calendario.</p>
</div>

<style>
  .empty {
    flex: 1;
    display: grid;
    place-content: center;
    gap: 6px;
    text-align: center;
    color: var(--text-muted);
  }
  .note {
    font-size: 13px;
  }
</style>
