<script lang="ts">
import { m } from '$lib/paraglide/messages';
import { getLocale } from '$lib/paraglide/runtime.js';
import { getProjectsRemote } from '$lib/utils/works/data.remote';

const query = getProjectsRemote()
const lang = getLocale()
</script>

<section id="works" class="section works-section">
  <div class="container">
    <h2 class="section-title">{m.sections_works()}</h2>
    {#if query.error}
      <p class="error-message">Error loading projects: {query.error.message}</p>
    {:else if query.loading}
      <p class="loading-message">Loading projects...</p>
    {:else if query.current}
      {#if query.current.length === 0}
        <p class="no-projects-message">No projects found.</p>
      {:else}
        <div class="projects-grid">
          {#each query.current as project (project.metadata.id)}
          {@const { title, description } = project.metadata}
            <div class="project-card">
              <h3 class="project-title">{title[lang]}</h3>
              <p class="project-description">{description[lang]}</p>
              <!-- Add more project details as needed -->
            </div>
          {/each}
        </div>
      {/if}
    {/if}
  </div>
</section>

<style>

</style>