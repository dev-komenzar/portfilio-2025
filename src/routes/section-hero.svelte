<script lang="ts">
	import ThreeShader from "$lib/components/ui/three/ThreeShader.svelte";
	import { m } from "$lib/paraglide/messages";
</script>

<section id="hero" class="hero-section">
	<div class="container hero-container">
		<div class="hero-content">
			<h1 class="hero-title">{m.hero_title()}</h1>
		</div>
	</div>
	<ThreeShader />
</section>

<style>
	.hero-section {
		min-height: 100lvh;
		display: flex;
		align-items: center;
		padding: var(--space-16) 0;
	}

	.hero-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		z-index: 1;
	}

	.hero-content {
		max-width: 800px;
	}

	.hero-title {
		color: var(--color-text);
		background: none;
		background-clip: initial;
		font-size: var(--text-5xl);
		font-weight: 700;
		margin-bottom: var(--space-4);
		-webkit-background-clip: initial;
		-webkit-text-fill-color: initial;
	}

	/* Responsive styles */
	@media (max-width: 767px) {
		.hero-title {
			font-size: var(--text-4xl);
		}
	}
</style>
