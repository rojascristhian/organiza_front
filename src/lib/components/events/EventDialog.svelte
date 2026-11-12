<script>
  import { onMount } from 'svelte';
  import { calendarStore } from '../../stores/calendar.svelte.js';
  import { t } from '../../i18n/i18n.svelte.js';
  import Icon from '../ui/Icon.svelte';

  // Local copy: the store is not touched until "Guardar" is pressed.
  let draft = $state({ ...calendarStore.draft });
  let dialog;

  // "Add calendar" mini-form
  let addingCalendar = $state(false);
  let newCalendarName = $state('');
  let newCalendarInput = $state();

  const isNew = !draft.id;
  const currentCalendar = calendarStore.getCalendarById(draft.calendarId);
  const readOnly = currentCalendar ? !currentCalendar.editable : false;

  const calendarOptions = $derived(
    readOnly ? [currentCalendar] : calendarStore.calendars.filter((c) => c.editable),
  );
  const selectedCalendar = $derived(calendarStore.getCalendarById(draft.calendarId));
  // Only calendars created by the user can be deleted.
  const canDeleteCalendar = $derived(Boolean(selectedCalendar?.custom));
  const dialogTitle = $derived(
    readOnly ? t('dialog.titleView') : isNew ? t('dialog.titleNew') : t('dialog.titleEdit'),
  );

  onMount(() => dialog.showModal());

  $effect(() => {
    if (addingCalendar) newCalendarInput?.focus();
  });

  function submit(e) {
    e.preventDefault();
    calendarStore.saveEvent($state.snapshot(draft));
    dialog.close();
  }

  function remove() {
    calendarStore.deleteEvent(draft.id);
    dialog.close();
  }

  function confirmAddCalendar() {
    const id = calendarStore.addCalendar(newCalendarName);
    if (id) draft.calendarId = id;
    newCalendarName = '';
    addingCalendar = false;
  }

  // Enter inside the name field adds the calendar instead of submitting the whole form.
  function handleNewCalendarKeydown(e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    confirmAddCalendar();
  }

  function removeCalendar() {
    const calendar = selectedCalendar;
    if (!calendar?.custom) return;

    const hasTasks = calendarStore.countEventsInCalendar(calendar.id) > 0;
    const message = t('dialog.deleteCalendarConfirm', { name: calendarStore.getCalendarName(calendar) });
    if (hasTasks && !confirm(message)) return;

    calendarStore.deleteCalendar(calendar.id);
    draft.calendarId = calendarOptions[0]?.id ?? '';
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
    <h2 id="dialog-title">{dialogTitle}</h2>

    <fieldset disabled={readOnly}>
      <label>
        <span>{t('dialog.title')}</span>
        <input type="text" bind:value={draft.title} placeholder={t('dialog.titlePlaceholder')} required />
      </label>

      <div class="field">
        <label for="calendar-select">{t('dialog.calendar')}</label>
        <div class="calendar-row">
          <select id="calendar-select" bind:value={draft.calendarId}>
            {#each calendarOptions as calendar (calendar.id)}
              <option value={calendar.id}>{calendarStore.getCalendarName(calendar)}</option>
            {/each}
          </select>

          {#if !readOnly}
            <button
              type="button"
              class="icon-action"
              aria-label={t('dialog.addCalendar')}
              title={t('dialog.addCalendar')}
              onclick={() => (addingCalendar = !addingCalendar)}
            >
              <Icon name="plus" size={16} />
            </button>
            <button
              type="button"
              class="icon-action danger"
              aria-label={t('dialog.deleteCalendar')}
              title={t('dialog.deleteCalendar')}
              disabled={!canDeleteCalendar}
              onclick={removeCalendar}
            >
              <Icon name="trash" size={16} />
            </button>
          {/if}
        </div>

        {#if addingCalendar}
          <div class="calendar-row">
            <input
              type="text"
              bind:this={newCalendarInput}
              bind:value={newCalendarName}
              placeholder={t('dialog.newCalendarName')}
              aria-label={t('dialog.newCalendarName')}
              onkeydown={handleNewCalendarKeydown}
            />
            <button type="button" class="text-action" onclick={confirmAddCalendar}>
              {t('dialog.addCalendarConfirm')}
            </button>
          </div>
        {/if}
      </div>

      <label>
        <span>{t('dialog.date')}</span>
        <input type="date" bind:value={draft.date} required />
      </label>

      <label class="inline">
        <input type="checkbox" bind:checked={draft.allDay} />
        <span>{t('dialog.allDay')}</span>
      </label>

      {#if !draft.allDay}
        <label>
          <span>{t('dialog.time')}</span>
          <input type="time" bind:value={draft.time} required />
        </label>
      {/if}

      <label>
        <span>{t('dialog.task')}</span>
        <textarea rows="3" bind:value={draft.notes}></textarea>
      </label>
    </fieldset>

    <div class="buttons">
      {#if !isNew && !readOnly}
        <button type="button" class="danger" onclick={remove}>{t('dialog.delete')}</button>
      {/if}
      <span class="spacer"></span>
      <button type="button" onclick={() => dialog.close()}>
        {readOnly ? t('dialog.close') : t('dialog.cancel')}
      </button>
      {#if !readOnly}
        <button type="submit" class="primary">{t('dialog.save')}</button>
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
  label,
  .field {
    display: grid;
    gap: 4px;
  }
  label span,
  .field > label {
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

  /* Calendar select + add / delete buttons */
  .calendar-row {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .calendar-row select,
  .calendar-row input {
    flex: 1;
    min-width: 0;
    width: auto;
  }
  .icon-action {
    flex: none;
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: var(--surface-2);
    color: var(--text);
  }
  .icon-action.danger {
    color: var(--accent);
  }
  .icon-action:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
  .text-action {
    flex: none;
    padding: 8px 12px;
    border-radius: 8px;
    background: var(--surface-2);
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
