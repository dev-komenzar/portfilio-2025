<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { onMount } from 'svelte';
  
  // Using Svelte 5 runes
  let theme = $state(getInitialTheme());
  
  // Get initial theme from localStorage or system preference
  function getInitialTheme(): 'dark' | 'light' {
    if (typeof window === 'undefined') return 'dark'; // Default to dark on server
    
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    
    // Then check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    
    // Default to dark
    return 'dark';
  }
  
  // Toggle theme between dark and light
  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
  }
  
  // Apply theme to document and save to localStorage
  function applyTheme(newTheme: 'dark' | 'light') {
    if (typeof document !== 'undefined') {
      if (newTheme === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
      localStorage.setItem('theme', newTheme);
    }
  }
  
  // Apply theme on mount
  onMount(() => {
    applyTheme(theme);
    
    // Listen for system theme changes
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('theme')) { // Only auto-switch if user hasn't manually set preference
          theme = e.matches ? 'light' : 'dark';
          applyTheme(theme);
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  });
  
  // Get the appropriate aria label based on current theme
  const ariaLabel = $derived(
    theme === 'dark' ? m.theme_toggle_light() : m.theme_toggle_dark()
  );
</script>

<button 
  type="button" 
  class="theme-toggle" 
  aria-label={ariaLabel}
  onclick={toggleTheme}
>
  {#if theme === 'dark'}
    <!-- Sun icon for light mode -->
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  {:else}
    <!-- Moon icon for dark mode -->
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  {/if}
</button>

<style>
  .theme-toggle {
    background: transparent;
    border: none;
    color: var(--color-text);
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color var(--transition-fast);
  }
  
  .theme-toggle:hover {
    background-color: var(--color-surface-elevated);
  }
  
  .theme-toggle:focus {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
  
  svg {
    transition: transform var(--transition-base);
  }
  
  .theme-toggle:hover svg {
    transform: rotate(15deg);
  }
</style>