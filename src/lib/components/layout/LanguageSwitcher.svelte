<script lang="ts">
  import { getLocale } from '$lib/paraglide/runtime';
  import { switchLanguage } from '$lib/utils/languageUtils';
  
  // Get the current locale
  const currentLocale = $derived(getLocale());
  
  // Determine the target locale (the one to switch to)
  const targetLocale = $derived(currentLocale === 'ja' ? 'en' : 'ja');
  
  // Text for the language switcher
  const switchText = $derived(currentLocale === 'ja' ? 'Switch to English' : '日本語に切り替える');
  
  // Handle language switch
  function handleLanguageSwitch() {
    // Store the preference in localStorage
    localStorage.setItem('preferred-language', targetLocale);
    
    // Switch the language (this will reload the page)
    switchLanguage(targetLocale);
  }
</script>

<button class="language-switcher" onclick={handleLanguageSwitch}>
  <span class="language-icon">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  </span>
  <span class="language-text">{switchText}</span>
</button>

<style>
  .language-switcher {
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
  
  .language-switcher:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
    background-color: var(--color-surface-elevated);
  }
  
  .language-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .language-text {
    display: none;
  }
  
  /* Desktop styles */
  @media (min-width: 768px) {
    .language-text {
      display: inline;
    }
  }
</style>