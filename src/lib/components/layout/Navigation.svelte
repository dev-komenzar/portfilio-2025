<script lang="ts">
  import { observeSections, scrollToSection } from '$lib/utils/scrollUtils';
  import { onMount } from 'svelte';
  
  // Define the sections that will be tracked using $props()
  const { sections = [
    { id: 'hero', label: 'ホーム' },
    { id: 'projects', label: 'プロジェクト' },
    { id: 'skills', label: 'スキル' },
    { id: 'contact', label: 'お問い合わせ' }
  ] } = $props();
  
  // Current active section
  let activeSection = $state('hero');
  
  // Handle navigation click
  function handleNavClick(sectionId: string, e: MouseEvent) {
    // Prevent default anchor behavior
    e.preventDefault();
    
    // Update active section
    activeSection = sectionId;
    
    // Scroll to the section
    scrollToSection(sectionId, 80); // 80px offset for header
  }
  
  onMount(() => {
    // Get section IDs
    const sectionIds = sections.map(section => section.id);
    
    // Set up observers for sections
    const cleanup = observeSections(sectionIds, (sectionId) => {
      // Update active section
      activeSection = sectionId;
      
      // Update URL hash without scrolling
      if (window.location.hash !== `#${sectionId}` && sectionId !== 'hero') {
        history.replaceState(null, '', `#${sectionId}`);
      } else if (sectionId === 'hero' && window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }
    });
    
    // Check if there's a hash in the URL on load
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      const section = sections.find(s => s.id === sectionId);
      if (section) {
        // Delay scrolling slightly to ensure the page is fully loaded
        setTimeout(() => {
          scrollToSection(sectionId, 80);
          activeSection = sectionId;
        }, 100);
      }
    }
    
    // Cleanup function
    return cleanup;
  });
</script>

<nav class="scroll-nav">
  <ul class="scroll-nav-list">
    {#each sections as section (section.id)}
      <li class="scroll-nav-item">
        <a 
          href="#{section.id}" 
          class="scroll-nav-link" 
          class:active={activeSection === section.id}
          onclick={(e) => handleNavClick(section.id, e)}
        >
          {section.label}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .scroll-nav {
    position: fixed;
    right: var(--space-6);
    top: 50%;
    transform: translateY(-50%);
    z-index: 90;
    display: none; /* Hidden on mobile by default */
  }
  
  .scroll-nav-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .scroll-nav-item {
    position: relative;
  }
  
  .scroll-nav-link {
    display: flex;
    align-items: center;
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
    transition: color var(--transition-fast);
    position: relative;
    padding: var(--space-1) 0;
  }
  
  .scroll-nav-link::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--color-text-muted);
    margin-right: var(--space-3);
    transition: background-color var(--transition-fast), transform var(--transition-fast);
  }
  
  .scroll-nav-link:hover {
    color: var(--color-text);
  }
  
  .scroll-nav-link:hover::before {
    background-color: var(--color-text);
  }
  
  .scroll-nav-link.active {
    color: var(--color-primary);
    font-weight: 600;
  }
  
  .scroll-nav-link.active::before {
    background-color: var(--color-primary);
    transform: scale(1.5);
  }
  
  /* Show on desktop only */
  @media (min-width: 1024px) {
    .scroll-nav {
      display: block;
    }
  }
</style>