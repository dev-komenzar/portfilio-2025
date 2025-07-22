<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { getLocale } from '$lib/paraglide/runtime';
  import { switchLanguage } from '$lib/utils/languageUtils';
  import { onMount } from 'svelte';
  
  // Get the current locale
  const currentLocale = $derived(getLocale());
  
  // Dropdown state
  let isOpen = $state(false);
  
  // Close the dropdown when clicking outside
  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.language-dropdown');
    const button = document.querySelector('.language-switcher-button');
    
    // ボタン自体のクリックは無視する（toggleDropdownで処理される）
    if (button && button.contains(target)) {
      return;
    }
    
    if (dropdown && !dropdown.contains(target) && isOpen) {
      isOpen = false;
    }
  }
  
  // Toggle dropdown
  function toggleDropdown(event: MouseEvent) {
    // イベントの伝播を停止して、handleClickOutsideが同時に発火するのを防ぐ
    event.stopPropagation();
    isOpen = !isOpen;
  }
  
  // Handle keyboard navigation in dropdown
  function handleKeyDown(event: KeyboardEvent) {
    if (!isOpen) return;
    
    // 変数宣言をswitch文の前に移動
    const options = document.querySelectorAll('.language-option');
    const focusedOption = document.activeElement;
    const focusedIndex = Array.from(options).indexOf(focusedOption as Element);
    
    switch (event.key) {
      case 'Escape':
        isOpen = false;
        break;
      case 'ArrowDown':
        event.preventDefault();
        // Focus the first or next option
        if (focusedIndex === -1 || focusedIndex === options.length - 1) {
          (options[0] as HTMLElement).focus();
        } else {
          (options[focusedIndex + 1] as HTMLElement).focus();
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        // Focus the previous option or last if at top
        if (focusedIndex <= 0) {
          (options[options.length - 1] as HTMLElement).focus();
        } else {
          (options[focusedIndex - 1] as HTMLElement).focus();
        }
        break;
    }
  }
  
  // Handle language switch
  function handleLanguageSwitch(locale: 'ja' | 'en') {
    if (locale === currentLocale) {
      isOpen = false;
      return;
    }
    
    // Store the preference in localStorage
    localStorage.setItem('preferred-language', locale);
    
    // Switch the language (this will reload the page)
    switchLanguage(locale, { reload: true });
  }
  
  // Add click outside listener
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="language-switcher-container">
  <button 
    class="language-switcher-button" 
    onclick={(e) => toggleDropdown(e)}
    onkeydown={handleKeyDown}
    aria-haspopup="true"
    aria-expanded={isOpen}
  >
    <span class="language-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    </span>
    <span class="current-language">{m.language_current()}</span>
    <span class="dropdown-arrow" class:open={isOpen}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </span>
  </button>
  
  {#if isOpen}
    <div class="language-dropdown" role="menu">
      <button 
        class="language-option" 
        class:active={currentLocale === 'ja'}
        onclick={() => handleLanguageSwitch('ja')}
        role="menuitem"
      >
        <span class="language-flag">🇯🇵</span>
        <span>日本語</span>
        {#if currentLocale === 'ja'}
          <span class="active-indicator">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        {/if}
      </button>
      <button 
        class="language-option" 
        class:active={currentLocale === 'en'}
        onclick={() => handleLanguageSwitch('en')}
        role="menuitem"
      >
        <span class="language-flag">🇺🇸</span>
        <span>English</span>
        {#if currentLocale === 'en'}
          <span class="active-indicator">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        {/if}
      </button>
    </div>
  {/if}
</div>

<style>
  .language-switcher-container {
    position: relative;
    display: inline-block;
  }
  
  .language-switcher-button {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: var(--space-2) var(--space-3);
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .language-switcher-button:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
    background-color: var(--color-surface-elevated);
  }
  
  .language-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .current-language {
    display: none;
  }
  
  .dropdown-arrow {
    display: none;
    transition: transform var(--transition-fast);
  }
  
  .dropdown-arrow.open {
    transform: rotate(180deg);
  }
  
  .language-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 160px;
    background-color: var(--color-surface-elevated);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999; /* z-indexを増やす */
    overflow: hidden;
  }
  
  .language-option {
    display: flex;
    align-items: center;
    width: 100%;
    padding: var(--space-3) var(--space-4);
    text-align: left;
    background: transparent;
    border: none;
    color: var(--color-text);
    font-size: var(--text-sm);
    cursor: pointer;
    transition: background-color var(--transition-fast);
    gap: var(--space-3);
  }
  
  .language-option:hover {
    background-color: var(--color-surface);
  }
  
  .language-option.active {
    color: var(--color-primary);
    background-color: var(--color-surface);
  }
  
  .language-flag {
    font-size: var(--text-lg);
  }
  
  .active-indicator {
    margin-left: auto;
    color: var(--color-primary);
  }
  
  /* Desktop styles */
  @media (min-width: 768px) {
    .current-language {
      display: inline;
    }
    
    .dropdown-arrow {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>