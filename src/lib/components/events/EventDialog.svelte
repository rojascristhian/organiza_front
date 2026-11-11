<script>
  import { onMount } from 'svelte';
  import { calendarStore } from '../../stores/calendar.svelte.js';

  // Local copy: the store is not touched until "Guardar" is pressed.
  let draft = $state({ ...calendarStore.draft });
  let dialog;

  const isNew = !draft.id;
  const currentCalendar = calendarStore.getCalendarById(draft.calendarId);
  const readOnly = currentCalendar ? !currentCalendar.editable : false;
  const calendarOptions = readOnly ? [currentCalendar] : calendarStore.calendars.filter((c) => c.editable);

  onMount(() => dialog.showModal());

  function submit(e) {
    e.preventDefault();
    calendarStore.saveEvent($state.snapshot(draft));
    dialog.close();
  }

  function remove() {
    calendarStore.deleteEvent(draft.id);
    dialog.close();
  }

  // A click on the <dialog> itself (not on the form) is a click on the backdrop.
  function handleBackdropClick(e) {
    if (e.target === dialog) dialog.close();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialog}
  aria-labelledby="dialog-title"
  onclose={() => calendarStore.closeEditor()}
  onclick={handleBackdropClick}
>
  <form onsubmit={submit}>
    <h2 id="dialog-title">{readOnly ? 'Evento' : isNew ? 'Nuevo evento' : 'Editar evento'}</h2>

    <fieldset disabled={readOnly}>
      <label>
        <span>Título</span>
        <input type="text" bind:value={draft.title} placeholder="Título del evento" required />
      </label>

      <label>
        <span>Calendario</span>
        <select bind:value={draft.calendarId}>
          {#each calendarOptions as calendar (calendar.id)}
            <option value={calendar.id}>{calendar.name}</option>
          {/each}
        </select>
      </label>

      <label>
        <span>Fecha</span>
        <input type="date" bind:value={draft.date} required />
      </label>

      <label class="inline">
        <input type="checkbox" bind:checked={draft.allDay} />
        <span>Todo el día</span>
      </label>

      {#if !draft.allDay}
        <label>
          <span>Hora</span>
          <input type="time" bind:value={draft.time} required />
        </label>
      {/if}

      <label>
        <span>Notas</span>
        <textarea rows="3" bind:value={draft.notes}></textarea>
      </label>
    </fieldset>

    <div class="buttons">
      {#if !isNew && !readOnly}
        <button type="button" class="danger" onclick={remove}>Eliminar</button>
      {/if}
      <span class="spacer"></span>
      <button type="button" onclick={() => dialog.close()}>{readOnly ? 'Cerrar' : 'Cancelar'}</button>
      {#if !readOnly}
        <button type="submit" class="primary">Guardar</button>
      {/if}
    </div>
  </form>
</dialog>

<style>
  dialog {
    margin: auto;
    width: min(420px, calc(100vw - 32px));
    padding: 0;
    border: 1px solid var(--line-strong);
    border-radius: 14px;
    background: var(--surface);
    color: var(--text);
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
    color: var(--text-muted);
  }
  .inline {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .inline span {
    color: var(--text);
    font-size: 15px;
  }
  input[type='text'],
  input[type='date'],
  input[type='time'],
  select,
  textarea {
    width: 100%;
    padding: 8px 10px;
    background: var(--bg);
    border: 1px solid var(--line-strong);
    border-radius: 8px;
    color: var(--text);
    font: inherit;
  }
  textarea {
    resize: vertical;
  }
  .buttons {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .spacer {
    flex: 1;
  }
  .buttons button {
    padding: 8px 14px;
    border-radius: 8px;
    background: var(--surface-2);
  }
  .buttons .primary {
    background: var(--accent);
    color: #fff;
    font-weight: 600;
  }
  .buttons .danger {
    color: var(--accent);
  }
</style>
