<script>
  // Simple stroke icons. To add a new one, add another {:else if} block.
  let { name, size = 20 } = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  {#if name === 'calendar'}
    <rect x="3" y="4" width="18" height="17" rx="3" />
    <path d="M3 9h18M8 2v4M16 2v4" />
  {:else if name === 'plus'}
    <path d="M12 5v14M5 12h14" />
  {:else if name === 'search'}
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  {:else if name === 'left'}
    <path d="M15 5l-7 7 7 7" />
  {:else if name === 'right'}
    <path d="M9 5l7 7-7 7" />
  {:else if name === 'check'}
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  {/if}
</svg>
