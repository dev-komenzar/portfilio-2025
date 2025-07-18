<script lang="ts">
  import { m } from '$lib/paraglide/messages';
</script>

<svelte:head>
  <title>{m.hero_title()}</title>
  <meta name="description" content={m.hero_description()} />
</svelte:head>

<section id="hero" class="hero-section">
  <div class="container hero-container">
    <div class="hero-content">
      <h1 class="hero-title">{m.hero_title()}</h1>
      <h2 class="hero-subtitle">{m.hero_subtitle()}</h2>
      <p class="hero-description">{m.hero_description()}</p>
      <div class="hero-actions">
        <a href="#projects" class="hero-button primary" onclick={(e) => {
          e.preventDefault();
          const projectsSection = document.getElementById('projects');
          if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, '', '#projects');
          }
        }}>{m.hero_cta()}</a>
      </div>
    </div>
  </div>
</section>

<section id="projects" class="section projects-section">
  <div class="container">
    <h2 class="section-title">{m.sections_projects()}</h2>
    <p>プロジェクト一覧がここに表示されます。</p>
  </div>
</section>

<section id="skills" class="section skills-section">
  <div class="container">
    <h2 class="section-title">{m.sections_skills()}</h2>
    <p>スキル一覧がここに表示されます。</p>
  </div>
</section>

<section id="contact" class="section contact-section">
  <div class="container">
    <h2 class="section-title">{m.sections_contact()}</h2>
    <p>お問い合わせフォームがここに表示されます。</p>
  </div>
</section>

<style>
  .hero-section {
    min-height: calc(100vh - var(--header-height));
    display: flex;
    align-items: center;
    padding: var(--space-16) 0;
    background: linear-gradient(to bottom, var(--color-background), var(--color-surface));
  }
  
  .hero-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  
  .hero-content {
    max-width: 800px;
  }
  
  .hero-title {
    font-size: var(--text-5xl);
    font-weight: 800;
    margin-bottom: var(--space-4);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .hero-subtitle {
    font-size: var(--text-3xl);
    font-weight: 700;
    margin-bottom: var(--space-6);
    color: var(--color-text);
  }
  
  .hero-description {
    font-size: var(--text-xl);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-8);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-actions {
    display: flex;
    gap: var(--space-4);
    justify-content: center;
  }
  
  .hero-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-3) var(--space-6);
    border-radius: 8px;
    font-weight: 600;
    transition: all var(--transition-fast);
  }
  
  .hero-button.primary {
    background: var(--gradient-primary);
    color: white;
    box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
  }
  
  .hero-button.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
  }
  
  .projects-section {
    background-color: var(--color-surface);
  }
  
  .skills-section {
    background-color: var(--color-background);
  }
  
  .contact-section {
    background-color: var(--color-surface);
  }
  
  /* Responsive styles */
  @media (max-width: 767px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
    
    .hero-subtitle {
      font-size: var(--text-2xl);
    }
    
    .hero-description {
      font-size: var(--text-lg);
    }
  }
</style>