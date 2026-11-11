<script>
  import Icon from './Icon.svelte';

  let { icon, label, pressed, size = 22, onclick } = $props();
</script>

<button class="icon-btn" type="button" aria-label={label} title={label} aria-pressed={pressed} {onclick}>
  <Icon name={icon} {size} />
</button>

<style>
  .icon-btn {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    color: var(--accent);
  }
  .icon-btn:hover {
    background: var(--surface);
  }
  .icon-btn[aria-pressed='true'] {
    background: var(--surface-2);
  }
</style>
