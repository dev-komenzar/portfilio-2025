<script lang="ts">
  // Card component with various styles and variants
  import type { Snippet } from 'svelte';

  // Using Svelte 5 runes for props
  const {
    variant = 'default',
    hover = false,
    clickable = false,
    children
  } = $props<{
    variant?: 'default' | 'elevated' | 'bordered' | 'gradient';
    hover?: boolean;
    clickable?: boolean;
    children?: Snippet;
  }>();

  // Compute classes based on props
  const cardClass = $derived(`card card-${variant} ${hover ? 'card-hover' : ''} ${clickable ? 'card-clickable' : ''}`);
</script>

<div class={cardClass}>
  {@render children?.()}
</div>

<style>
  .card {
    border-radius: 0.5rem;
    overflow: hidden;
    transition: var(--transition-base);
  }

  /* Style variants */
  .card-default {
    background-color: var(--color-neutral-white);
  }

  .card-elevated {
    background-color: var(--color-neutral-white);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .card-bordered {
    background-color: var(--color-neutral-white);
    border: 1px solid var(--color-border);
  }

  .card-gradient {
    background: var(--gradient-surface);
  }

  /* Hover effect */
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  /* Clickable style */
  .card-clickable {
    cursor: pointer;
  }

  .card-clickable:active {
    transform: translateY(1px);
  }
</style>