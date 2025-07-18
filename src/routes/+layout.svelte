<script lang="ts">
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import Navigation from '$lib/components/layout/Navigation.svelte';
  import { initializeLanguage } from '$lib/utils/languageUtils';
  import { onMount } from 'svelte';
  import '../lib/styles/global.css';

  const {children} = $props()
  
  // Check if we're on the home page
  let isHomePage = $state(false);
  
  // Initialize language settings on mount
  onMount(() => {
    // Check if we're on the home page
    isHomePage = window.location.pathname === '/' || 
                window.location.pathname === '/en/' || 
                window.location.pathname === '/ja/';
    
    // Initialize language settings
    initializeLanguage();
  });
</script>

<div class="layout">
  <!-- Skip to content link for accessibility -->
  <a href="#main-content" class="skip-to-content">Skip to content</a>
  
  <Header />
  
  {#if isHomePage}
    <Navigation />
  {/if}
  
  <main id="main-content" class="main-content">
    {@render children()}
  </main>
  
  <Footer />
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1;
    margin-top: var(--header-height);
    width: 100%;
  }
</style>