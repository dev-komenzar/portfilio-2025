<script lang="ts">
	import { generateGradientFromTags, getInitial, isDarkGradient } from '$lib/utils/gradient';

	interface Props {
		title: string;
		tags: string[];
		id: string;
	}

	const { title, tags, id }: Props = $props();

	const gradient = generateGradientFromTags(tags, id);
	const initial = getInitial(title);
	const isDark = isDarkGradient(gradient);
</script>

<div class="gradient-thumbnail" style="background: {gradient};">
	<div class="initial" class:dark={isDark}>
		{initial}
	</div>
	<div class="tags" class:dark={isDark}>
		{#each tags.slice(0, 2) as tag (tag)}
			<span class="tag">{tag}</span>
		{/each}
	</div>
</div>

<style>
	.gradient-thumbnail {
		width: 100%;
		height: 100%;
		min-height: 200px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}

	.initial {
		font-size: 5rem;
		font-weight: 700;
		color: rgba(255, 255, 255, 0.9);
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		margin-bottom: var(--space-4);
		user-select: none;
	}

	.initial.dark {
		color: rgba(0, 0, 0, 0.7);
		text-shadow: 0 2px 10px rgba(255, 255, 255, 0.2);
	}

	.tags {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
		justify-content: center;
	}

	.tag {
		padding: var(--space-1) var(--space-3);
		background: rgba(255, 255, 255, 0.25);
		backdrop-filter: blur(10px);
		border-radius: var(--radius-sm);
		font-size: var(--text-xs);
		color: rgba(255, 255, 255, 0.95);
		font-weight: 500;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.tags.dark .tag {
		background: rgba(0, 0, 0, 0.15);
		color: rgba(0, 0, 0, 0.8);
		border: 1px solid rgba(0, 0, 0, 0.2);
	}
</style>
