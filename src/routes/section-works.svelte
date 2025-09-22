<script lang="ts">
import { asset, resolve } from '$app/paths';
import ThumbnailCard from '$lib/components/ui/ThumbnailCard.svelte';
import { getProjectsRemote } from '$lib/data/works/data.remote';
import { m } from '$lib/paraglide/messages';
import { getLocale } from '$lib/paraglide/runtime.js';

const query = getProjectsRemote()
const lang = getLocale()

</script>

<section id="works" class="section works-section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">{m.sections_works()}</h2>
      <a href={resolve("/works")} class="view-all-link">{m.view_all_projects()} &rarr;</a>
    </div>
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
          {@const { title, shortDescription, images, id } = project.metadata}
          {@const thumbnailUrl = images.thumbnail ? asset('works/' + images.thumbnail) : undefined}
            <ThumbnailCard
              variant="bordered"
              hover
              thumbnailUrl={thumbnailUrl}
              thumbnailAlt={title[lang]}
              href={resolve(`/works/${id}`)}
            >
              <h3 class="project-title">{title[lang]}</h3>
              <p class="project-description">{shortDescription[lang]}</p>
            </ThumbnailCard>
          {/each}
        </div>
      {/if}
    {/if}
  </div>
</section>

<style>
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-6); /* h2の元のmargin-bottomに合わせる */
  }

  .view-all-link {
    color: var(--color-text-secondary);
    transition: color var(--transition-fast);
  }
  .view-all-link:hover {
    color: var(--color-primary);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-6);
  }
</style>