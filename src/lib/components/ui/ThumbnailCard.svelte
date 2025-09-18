<script lang="ts">
	import Card from "$lib/components/ui/Card.svelte";
	import type { Snippet } from "svelte";

	type Props = {
		thumbnailUrl?: string;
		thumbnailAlt?: string;
		href?: string;
		children?: Snippet;
		// Cardコンポーネントが受け取る残りのプロパティ
		variant?: "default" | "elevated" | "bordered" | "gradient";
		hover?: boolean;
	};

	const noImagePlaceholder =
	'https://placehold.jp/eeeeee/cccccc/240x180.png?text=No%20Image'

	const { thumbnailUrl = noImagePlaceholder, thumbnailAlt ='No Image', href, children, ...restProps }: Props =
		$props();
</script>

<Card {...restProps} clickable={!!href}>
	{#if href}
		<a {href} class="card-link" target="_blank" rel="noopener noreferrer">
			<div class="thumbnail-wrapper">
				<img src={thumbnailUrl} alt={thumbnailAlt} class="thumbnail-image" />
			</div>
			<div class="content-wrapper">
				{@render children?.()}
			</div>
		</a>
	{:else}
		<div class="thumbnail-wrapper">
			<img src={thumbnailUrl} alt={thumbnailAlt} class="thumbnail-image" />
		</div>
		<div class="content-wrapper">
			{@render children?.()}
		</div>
	{/if}
</Card>

<style>
	.card-link {
		display: block;
		color: inherit;
		text-decoration: none;
	}

	.thumbnail-wrapper {
		aspect-ratio: 16 / 9;
		overflow: hidden;
	}

	.thumbnail-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	:global(.card-hover:hover .thumbnail-image) {
		transform: scale(1.05);
	}

	.content-wrapper {
		padding: var(--space-4);
	}
</style>
