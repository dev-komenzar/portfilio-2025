<script lang="ts">
  import { type Snippet } from 'svelte';
  import '../lib/styles/global.css';

  const {children}: {children: Snippet} = $props()
  
</script>

<div class="layout">
  <main id="main-content" class="main-content">
    {@render children()}
  </main>
  
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1;
    margin-top: 0px;
    width: 100%;
  }
</style>