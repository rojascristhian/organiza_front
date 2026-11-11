<script>
  import { onMount } from 'svelte';
  import { agenda } from '../../stores/agenda.svelte.js';

  // Copia local: no se toca el store hasta pulsar «Guardar».
  let borrador = $state({ ...agenda.editor });
  let dialogo;

  const esNuevo = !borrador.id;
  const calendarioActual = agenda.calendarioPorId(borrador.calendarioId);
  const soloLectura = calendarioActual ? !calendarioActual.editable : false;
  const opciones = soloLectura ? [calendarioActual] : agenda.calendarios.filter((c) => c.editable);

  onMount(() => dialogo.showModal());

  function enviar(e) {
    e.preventDefault();
    agenda.guardarEvento($state.snapshot(borrador));
    dialogo.close();
  }

  function eliminar() {
    agenda.eliminarEvento(borrador.id);
    dialogo.close();
  }

  // Un clic sobre el propio <dialog> (y no sobre el formulario) es un clic en el fondo.
  function clicFondo(e) {
    if (e.target === dialogo) dialogo.close();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialogo} aria-labelledby="titulo-dialogo" onclose={() => agenda.cerrarEditor()} onclick={clicFondo}>
  <form onsubmit={enviar}>
    <h2 id="titulo-dialogo">{soloLectura ? 'Evento' : esNuevo ? 'Nuevo evento' : 'Editar evento'}</h2>

    <fieldset disabled={soloLectura}>
      <label>
        <span>Título</span>
        <input type="text" bind:value={borrador.titulo} placeholder="Título del evento" required />
      </label>

      <label>
        <span>Calendario</span>
        <select bind:value={borrador.calendarioId}>
          {#each opciones as cal (cal.id)}
            <option value={cal.id}>{cal.nombre}</option>
          {/each}
        </select>
      </label>

      <label>
        <span>Fecha</span>
        <input type="date" bind:value={borrador.fecha} required />
      </label>

      <label class="en-linea">
        <input type="checkbox" bind:checked={borrador.todoElDia} />
        <span>Todo el día</span>
      </label>

      {#if !borrador.todoElDia}
        <label>
          <span>Hora</span>
          <input type="time" bind:value={borrador.hora} required />
        </label>
      {/if}

      <label>
        <span>Notas</span>
        <textarea rows="3" bind:value={borrador.notas}></textarea>
      </label>
    </fieldset>

    <div class="botones">
      {#if !esNuevo && !soloLectura}
        <button type="button" class="peligro" onclick={eliminar}>Eliminar</button>
      {/if}
      <span class="espacio"></span>
      <button type="button" onclick={() => dialogo.close()}>{soloLectura ? 'Cerrar' : 'Cancelar'}</button>
      {#if !soloLectura}
        <button type="submit" class="primario">Guardar</button>
      {/if}
    </div>
  </form>
</dialog>

<style>
  dialog {
    margin: auto;
    width: min(420px, calc(100vw - 32px));
    padding: 0;
    border: 1px solid var(--linea-fuerte);
    border-radius: 14px;
    background: var(--superficie);
    color: var(--texto);
  }
  dialog::backdrop {
    background: rgb(0 0 0 / 0.6);
  }
  form {
    display: grid;
    gap: 16px;
    padding: 20px;
  }
  h2 {
    font-size: 18px;
    font-weight: 600;
  }
  fieldset {
    display: grid;
    gap: 12px;
    border: 0;
    min-width: 0;
  }
  label {
    display: grid;
    gap: 4px;
  }
  label span {
    font-size: 13px;
    color: var(--texto-suave);
  }
  .en-linea {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .en-linea span {
    color: var(--texto);
    font-size: 15px;
  }
  input[type='text'],
  input[type='date'],
  input[type='time'],
  select,
  textarea {
    width: 100%;
    padding: 8px 10px;
    background: var(--fondo);
    border: 1px solid var(--linea-fuerte);
    border-radius: 8px;
    color: var(--texto);
    font: inherit;
  }
  textarea {
    resize: vertical;
  }
  .botones {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .espacio {
    flex: 1;
  }
  .botones button {
    padding: 8px 14px;
    border-radius: 8px;
    background: var(--superficie-2);
  }
  .botones .primario {
    background: var(--acento);
    color: #fff;
    font-weight: 600;
  }
  .botones .peligro {
    color: var(--acento);
  }
</style>
