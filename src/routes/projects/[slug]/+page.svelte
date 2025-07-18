<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  
  // Get the slug from the URL using $props()
  const { params } = $props();
  const {slug}=params
</script>

<svelte:head>
  <title>{m.project_title()} - {slug}</title>
  <meta name="description" content={m.project_title()} />
</svelte:head>

<section class="project-detail">
  <div class="container">
    <div class="project-header">
      <a href="/projects" class="back-link">&larr; {m.project_backToProjects()}</a>
      <h1 class="project-title">{m.project_title()} - {slug}</h1>
    </div>
    
    <div class="project-content">
      <p class="project-not-found">{m.project_notFound()}</p>
      <!-- Project details will be added here -->
    </div>
  </div>
</section>

<style>
  .project-detail {
    padding: var(--space-16) 0;
  }
  
  .project-header {
    margin-bottom: var(--space-8);
  }
  
  .back-link {
    display: inline-block;
    margin-bottom: var(--space-4);
    color: var(--color-text-secondary);
    transition: color var(--transition-fast);
  }
  
  .back-link:hover {
    color: var(--color-primary);
  }
  
  .project-title {
    font-size: var(--text-4xl);
    font-weight: 700;
    margin-bottom: var(--space-6);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .project-content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
  
  .project-not-found {
    color: var(--color-text-muted);
    font-style: italic;
    text-align: center;
    padding: var(--space-8);
    border: 1px dashed var(--color-border);
    border-radius: 8px;
  }
  
  /* Responsive layout */
  @media (min-width: 768px) {
    .project-content {
      grid-template-columns: 2fr 1fr;
    }
  }
</style>