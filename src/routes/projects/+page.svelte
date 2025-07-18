<script lang="ts">
  // Placeholder for translations
  const projects = {
    title: 'プロジェクト一覧',
    description: '私が手がけたプロジェクトの一覧です。',
    empty: 'プロジェクトはまだ追加されていません。'
  };
</script>

<svelte:head>
  <title>{projects.title}</title>
  <meta name="description" content={projects.description} />
</svelte:head>

<section class="projects-page">
  <div class="container">
    <h1 class="page-title">{projects.title}</h1>
    <p class="page-description">{projects.description}</p>
    
    <div class="projects-grid">
      <p class="projects-empty">{projects.empty}</p>
      <!-- Project cards will be added here -->
    </div>
  </div>
</section>

<style>
  .projects-page {
    padding: var(--space-16) 0;
  }
  
  .page-title {
    font-size: var(--text-4xl);
    font-weight: 700;
    margin-bottom: var(--space-4);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .page-description {
    font-size: var(--text-xl);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-8);
    max-width: 800px;
  }
  
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: var(--space-6);
    margin-top: var(--space-8);
  }
  
  .projects-empty {
    color: var(--color-text-muted);
    font-style: italic;
    text-align: center;
    padding: var(--space-8);
    border: 1px dashed var(--color-border);
    border-radius: 8px;
    grid-column: 1 / -1;
  }
  
  /* Responsive grid */
  @media (min-width: 640px) {
    .projects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (min-width: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>