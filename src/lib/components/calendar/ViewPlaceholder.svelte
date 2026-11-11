<script>
  let { vista } = $props();

  const nombres = { dia: 'día', semana: 'semana', anio: 'año' };
</script>

<div class="vacio">
  <p>La vista de {nombres[vista] ?? vista} todavía no está construida.</p>
  <p class="nota">Cambia a «Mes» para ver el calendario.</p>
</div>

<style>
  .vacio {
    flex: 1;
    display: grid;
    place-content: center;
    gap: 6px;
    text-align: center;
    color: var(--texto-suave);
  }
  .nota {
    font-size: 13px;
  }
</style>
