<script lang="ts">
	import { resolve } from '$app/paths';
	import ThumbnailCard from '$lib/components/ui/ThumbnailCard.svelte';
	import { getProjectsRemote } from '$lib/data/works/data.remote';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';


	const query = getProjectsRemote();
	const lang = getLocale();
</script>

<svelte:head>
	<title>{m.sections_works()}</title>
	<meta name="description" content={m.works_description()} />
</svelte:head>

<section class="works-page">
	<div class="container">
		<h1 class="page-title">{m.sections_works()}</h1>
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
						<ThumbnailCard
							variant="bordered"
							hover
							thumbnailUrl={images.thumbnail || undefined}
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

	<div class="back-link">
		<a href={resolve("/")}>← トップページへ戻る</a>
	</div>
</section>

<style>
	.works-page {
		padding: var(--space-16) 0;
	}

	.page-title {
		font-size: var(--text-4xl);
		font-weight: 700;
		margin-bottom: var(--space-8);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: var(--space-6);
	}

	.back-link {
		margin-top: var(--space-12);
		text-align: center;
	}
	.back-link a {
		color: var(--color-primary-dark);
		text-decoration: none;
		font-size: var(--text-lg);
	}
</style>