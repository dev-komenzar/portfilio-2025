<script lang="ts">
  import { page } from '$app/stores';
  
  // Get the slug from the URL
  const slug = $page.params.slug;
  
  // Placeholder for translations and project data
  const project = {
    title: 'プロジェクト詳細',
    notFound: 'プロジェクトが見つかりません。',
    backToProjects: 'プロジェクト一覧に戻る'
  };
</script>

<svelte:head>
  <title>{project.title} - {slug}</title>
  <meta name="description" content="プロジェクト詳細ページです。" />
</svelte:head>

<section class="project-detail">
  <div class="container">
    <div class="project-header">
      <a href="/projects" class="back-link">&larr; {project.backToProjects}</a>
      <h1 class="project-title">{project.title} - {slug}</h1>
    </div>
    
    <div class="project-content">
      <p class="project-not-found">{project.notFound}</p>
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