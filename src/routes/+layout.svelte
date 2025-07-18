<script lang="ts">
  import { page } from '$app/state';
  import Footer from '$lib/components/layout/Footer.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import Navigation from '$lib/components/layout/Navigation.svelte';
  import '../lib/styles/global.css';

  const {children} =$props()
  
  // Check if we're on the home page
  const isHomePage = $derived(page.url.pathname === '/');
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