<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { scrollToSection } from '$lib/utils/scrollUtils';
  import ThemeToggle from './ThemeToggle.svelte';
  
  // Define props using $props()
  const {
    sections = [
      { id: 'hero', label: m.nav_home() },
      { id: 'projects', label: m.nav_projects() },
      { id: 'skills', label: m.nav_skills() },
      { id: 'contact', label: m.nav_contact() }
    ],
    activeSection: propActiveSection = 'hero',
    isOpen: propIsOpen = false
  } = $props();
  
  // Create local state variables
  let currentSection = $state(propActiveSection);
  let menuOpen = $state(propIsOpen);
  
  // Handle navigation click
  function handleNavClick(sectionId: string) {
    // Update active section
    currentSection = sectionId;
    
    // Close the mobile menu
    menuOpen = false;
    
    // Scroll to the section
    scrollToSection(sectionId, 80); // 80px offset for header
  }
</script>

<div class="mobile-nav" class:is-open={menuOpen}>
  <ul class="mobile-nav-list">
    {#each sections as section (section.id)}
      <li class="mobile-nav-item">
        <a 
          href="#{section.id}" 
          class="mobile-nav-link" 
          class:active={currentSection === section.id}
          onclick={(e) => {
            e.preventDefault();
            handleNavClick(section.id);
          }}
        >
          {section.label}
        </a>
      </li>
    {/each}
  </ul>
  
  <div class="mobile-nav-actions">
    <div class="mobile-theme-toggle">
      <ThemeToggle />
    </div>
  </div>
</div>

<style>
  .mobile-nav {
    position: fixed;
    top: var(--header-height);
    left: 0;
    width: 100%;
    height: 0;
    background-color: var(--color-surface);
    overflow: hidden;
    transition: height var(--transition-base);
    z-index: 89;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .mobile-nav.is-open {
    height: auto;
    padding: var(--space-4) 0;
  }
  
  .mobile-nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .mobile-nav-item {
    padding: 0;
    margin: 0;
  }
  
  .mobile-nav-link {
    display: block;
    padding: var(--space-3) var(--space-6);
    color: var(--color-text);
    font-size: var(--text-lg);
    text-decoration: none;
    transition: background-color var(--transition-fast);
    position: relative;
  }
  
  .mobile-nav-link.active {
    color: var(--color-primary);
    font-weight: 600;
    background-color: var(--color-surface-elevated);
  }
  
  .mobile-nav-link.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--gradient-primary);
  }
  
  .mobile-nav-link:hover {
    background-color: var(--color-surface-elevated);
  }
  
  .mobile-nav-actions {
    display: flex;
    justify-content: center;
    padding: var(--space-4) var(--space-6);
    border-top: 1px solid var(--color-border);
    margin-top: var(--space-4);
  }
  
  .mobile-theme-toggle {
    display: flex;
    justify-content: center;
  }
  
  /* Hide on desktop */
  @media (min-width: 1024px) {
    .mobile-nav {
      display: none;
    }
  }
</style>