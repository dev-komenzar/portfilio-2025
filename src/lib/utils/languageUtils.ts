import { browser } from '$app/environment';
import { localizeUrl, setLocale, type Locale } from '$lib/paraglide/runtime';

/**
 * Detects the user's preferred language from browser settings
 * Falls back to baseLocale (ja) if no match is found
 * 
 * @returns The detected locale
 */
export function detectBrowserLanguage(): Locale {
  if (!browser) return 'ja';
  
  // Get browser languages
  const browserLanguages = navigator.languages || [navigator.language];
  
  // Check if any of the browser languages match our supported locales
  for (const lang of browserLanguages) {
    const normalizedLang = lang.toLowerCase().split('-')[0];
    if (normalizedLang === 'ja') return 'ja';
    if (normalizedLang === 'en') return 'en';
  }
  
  // Default to Japanese
  return 'ja';
}

/**
 * Switches the application language
 * 
 * @param locale The locale to switch to
 * @param options Options for language switching
 */
export function switchLanguage(locale: Locale, options?: { reload?: boolean }): void {
  setLocale(locale, options);
}

/**
 * Gets the localized URL for the current page
 * 
 * @param path The path to localize
 * @param locale The target locale (defaults to current locale)
 * @returns The localized URL
 */
export function getLocalizedPath(path: string, locale?: Locale): string {
  const url = new URL(path, window.location.origin);
  const localizedUrl = localizeUrl(url, { locale });
  return localizedUrl.pathname + localizedUrl.search + localizedUrl.hash;
}

/**
 * Initializes the language settings based on:
 * 1. Stored preference (localStorage)
 * 2. URL parameter
 * 3. Browser language
 * 4. Default to Japanese
 */
export function initializeLanguage(): void {
  if (!browser) return;
  
  // Check if we already have a stored preference
  const storedLocale = localStorage.getItem('preferred-language');
  if (storedLocale === 'ja' || storedLocale === 'en') {
    // Use stored preference without reloading
    setLocale(storedLocale, { reload: false });
    return;
  }
  
  // Otherwise detect from browser
  const detectedLocale = detectBrowserLanguage();
  setLocale(detectedLocale, { reload: false });
  
  // Store the preference
  localStorage.setItem('preferred-language', detectedLocale);
}