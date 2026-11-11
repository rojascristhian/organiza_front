<script>
  import { calendarStore } from '../../stores/calendar.svelte.js';
  import Icon from '../ui/Icon.svelte';

  let { calendar } = $props();
</script>

<button
  class="item"
  type="button"
  aria-pressed={calendar.visible}
  onclick={() => calendarStore.toggleCalendar(calendar.id)}
>
  <span class="mark" class:off={!calendar.visible} style:--color={calendar.color}>
    {#if calendar.visible}<Icon name="check" size={13} />{/if}
  </span>
  <span class="text">
    <span class="name">{calendar.name}</span>
    {#if calendar.detail}<span class="detail">{calendar.detail}</span>{/if}
  </span>
</button>

<style>
  .item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 12px;
    text-align: left;
  }
  .mark {
    flex: none;
    display: grid;
    place-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: var(--color);
    border: 2px solid var(--color);
    color: #000;
  }
  .mark.off {
    background: transparent;
  }
  .text {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 1px;
  }
  .name {
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .detail {
    font-size: 11px;
    color: var(--text-muted);
  }
</style>
