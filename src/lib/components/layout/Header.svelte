<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { observeSections } from '$lib/utils/scrollUtils';
  import { onMount } from 'svelte';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import MobileNav from './MobileNav.svelte';
  
  // Navigation sections
  const sections = [
    { id: 'hero', label: m.nav_home() },
    { id: 'projects', label: m.nav_projects() },
    { id: 'skills', label: m.nav_skills() },
    { id: 'contact', label: m.nav_contact() }
  ];
  
  // Current active section
  let activeSection = $state('hero');
  
  // Check if we're on the home page
  let isHomePage = $state(false);
  
  // Mobile menu state
  let isMenuOpen = $state(false);
  
  // Toggle mobile menu
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
  
  // Close mobile menu when clicking outside
  function closeMenu() {
    isMenuOpen = false;
  }
  
  // Set up section observers when on home page
  onMount(() => {
    // Check if we're on the home page
    isHomePage = window.location.pathname === '/' || 
                window.location.pathname === '/en/' || 
                window.location.pathname === '/ja/';
                
    if (isHomePage) {
      const sectionIds = sections.map(section => section.id);
      return observeSections(sectionIds, (sectionId) => {
        activeSection = sectionId;
      });
    }
  });
  
  // Handle smooth scrolling for anchor links on the home page
  function handleNavClick(e: MouseEvent, target: string) {
    // Only handle smooth scrolling on the home page
    if (!isHomePage) return;
    
    e.preventDefault();
    const element = document.getElementById(target);
    
    if (element) {
      // Close mobile menu
      closeMenu();
      
      // Scroll to element
      const headerOffset = 80; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update URL hash
      history.pushState(null, '', `#${target}`);
    }
  }
</script>

<header class="header">
  <div class="container header-container">
    <a href="/" class="logo">
      <span class="logo-text">Portfolio</span>
    </a>
    
    <button 
      class="menu-toggle" 
      aria-expanded={isMenuOpen} 
      aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
      onclick={toggleMenu}
    >
      <span class="menu-toggle-bar"></span>
      <span class="menu-toggle-bar"></span>
      <span class="menu-toggle-bar"></span>
    </button>
    
    <nav class="main-nav" class:is-open={isMenuOpen}>
      <ul class="nav-list">
        <li class="nav-item">
          <a 
            href={isHomePage ? "#hero" : "/"} 
            class="nav-link" 
            onclick={(e) => isHomePage && handleNavClick(e, "hero")}
          >
            {m.nav_home()}
          </a>
        </li>
        <li class="nav-item">
          <a 
            href={isHomePage ? "#projects" : "/projects"} 
            class="nav-link"
            onclick={(e) => isHomePage && handleNavClick(e, "projects")}
          >
            {m.nav_projects()}
          </a>
        </li>
        <li class="nav-item">
          <a 
            href={isHomePage ? "#skills" : "/#skills"} 
            class="nav-link"
            onclick={(e) => isHomePage && handleNavClick(e, "skills")}
          >
            {m.nav_skills()}
          </a>
        </li>
        <li class="nav-item">
          <a 
            href={isHomePage ? "#contact" : "/#contact"} 
            class="nav-link"
            onclick={(e) => isHomePage && handleNavClick(e, "contact")}
          >
            {m.nav_contact()}
          </a>
        </li>
      </ul>
      
      <!-- Language switcher -->
      <div class="language-switcher-placeholder">
        <LanguageSwitcher />
      </div>
    </nav>
    
    {#if isMenuOpen}
      <div 
        class="overlay" 
        role="button" 
        tabindex="0"
        onclick={closeMenu}
        onkeydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeMenu();
          }
        }}
      ></div>
    {/if}
    
    {#if isHomePage}
      <MobileNav 
        sections={sections} 
        activeSection={activeSection} 
        isOpen={isMenuOpen} 
      />
    {/if}
  </div>
</header>

<style>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-height);
    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    z-index: 100;
    transition: background-color var(--transition-base);
  }
  
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  
  .logo {
    display: flex;
    align-items: center;
    font-size: var(--text-xl);
    font-weight: 700;
    color: var(--color-text);
    z-index: 101;
  }
  
  .logo-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 18px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 101;
  }
  
  .menu-toggle-bar {
    width: 100%;
    height: 2px;
    background-color: var(--color-text);
    transition: transform var(--transition-fast), opacity var(--transition-fast);
  }
  
  .menu-toggle[aria-expanded="true"] .menu-toggle-bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  
  .menu-toggle[aria-expanded="true"] .menu-toggle-bar:nth-child(2) {
    opacity: 0;
  }
  
  .menu-toggle[aria-expanded="true"] .menu-toggle-bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
  
  .main-nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--color-surface);
    transform: translateX(100%);
    transition: transform var(--transition-base);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  
  .main-nav.is-open {
    transform: translateX(0);
  }
  
  .nav-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-6);
  }
  
  .nav-link {
    font-size: var(--text-xl);
    color: var(--color-text);
    transition: color var(--transition-fast);
    position: relative;
  }
  
  .nav-link:hover {
    color: var(--color-primary);
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: width var(--transition-base);
  }
  
  .nav-link:hover::after {
    width: 100%;
  }
  
  .language-switcher-placeholder {
    margin-top: var(--space-8);
  }
  
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
  
  /* Desktop styles */
  @media (min-width: 768px) {
    .menu-toggle {
      display: none;
    }
    
    .main-nav {
      position: static;
      height: auto;
      transform: none;
      background-color: transparent;
      width: auto;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
    }
    
    .nav-list {
      flex-direction: row;
      gap: var(--space-6);
    }
    
    .nav-link {
      font-size: var(--text-base);
    }
    
    .language-switcher-placeholder {
      margin-top: 0;
      margin-left: var(--space-6);
    }
    
    .overlay {
      display: none;
    }
  }
</style>