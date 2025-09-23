<script lang="ts">
  import { asset, resolve } from "$app/paths";
  import { getProjectBySlugRemote } from "$lib/data/works/data.remote.js";
  import { m } from "$lib/paraglide/messages";
  import { getLocale } from "$lib/paraglide/runtime.js";
  import { TinySlider } from "svelte-tiny-slider";

  // Get the slug from the URL using $props()
  const { params } = $props();
  const { slug } = params;
  const query = getProjectBySlugRemote(slug);
  const lang = getLocale();
</script>

<svelte:head>
  <title>{m.project_title()} - {slug}</title>
  <meta name="description" content={m.project_title()} />
</svelte:head>

<section class="detail">
  <div class="container">
    <div class="header">
      <a href={resolve("/works")} class="back-link"
        >&larr; {m.project_backToProjects()}</a
      >
      <h1 class="title">{m.project_title()} - {slug}</h1>
    </div>

    {#if query.error}
      <p class="error-message">Error loading project: {query.error.message}</p>
    {:else if query.loading}
      <p class="loading-message">Loading project...</p>
    {:else if query.current}
      {@const project = query.current}
      {@const images = [
        project.metadata.images.thumbnail,
        ...project.metadata.images.gallery,
      ]}
      {@const { thumbnail, gallery } = project.metadata.images}
      <div class="content">
        <div class="gallery">
          <TinySlider>
            <img src={asset(thumbnail)} alt="サムネイル" />
            {#each gallery as image (image.toString())}
              <img src={asset(image)} alt={project.metadata.title[lang]} />
            {/each}

            {#snippet controls({ setIndex, currentIndex })}
              <div class="controls-wrapper">
                {#each images as image, i (image.toString())}
                  <button
                    class:active={i === currentIndex}
                    onclick={() => setIndex(i)}
                    onfocus={() => setIndex(i)}
                    aria-label="Go to slide {i + 1}"
                  >
                    <img
                      src={asset(image)}
                      alt={`Pic ${i}`}
                      class="thumbnail"
                    />
                  </button>
                {/each}
              </div>
            {/snippet}
          </TinySlider>
        </div>
        <h2>{project.metadata.title[lang]}</h2>
        <div>
          {@html project.content}
        </div>
      </div>
    {:else}
      <p class="not-found">Project not found.</p>
    {/if}
  </div>
</section>

<style>
  .detail {
    padding: var(--space-16) 0;
  }

  .header {
    margin-bottom: var(--space-8);
  }

  .gallery {
    position: relative;
    overflow: hidden;
  }

  img {
    max-width: 720px;
    border-radius: 8px;
  }

  .controls-wrapper {
    margin-top: var(--space-4);
  }

  .controls-wrapper > * + * {
    margin-left: var(--space-2);
  }

  button {
    border: none;
  }

  .thumbnail {
    width: 120px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
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

  .title {
    font-size: var(--text-4xl);
    font-weight: 700;
    margin-bottom: var(--space-6);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .content {
    /*display: flex;*/
    flex-direction: column;
    gap: var(--space-8);
  }

  .not-found {
    color: var(--color-text-muted);
    font-style: italic;
    text-align: center;
    padding: var(--space-8);
    border: 1px dashed var(--color-border);
    border-radius: 8px;
  }

  /* Responsive layout */
  @media (min-width: 768px) {
    .content {
      grid-template-columns: 2fr 1fr;
    }
  }
</style>
