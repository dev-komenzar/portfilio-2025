<script lang="ts">
  import { m } from "$lib/paraglide/messages";
  import SectionAboutMe from './section-about-me.svelte';
  import SectionBlog from './section-blog.svelte';
  import SectionContact from './section-contact.svelte';
  import SectionHero from "./section-hero.svelte";
  import SectionWorks from "./section-works.svelte";
</script>

<svelte:head>
  <title>{m.hero_title()}</title>
  <meta name="description" content={m.hero_description()} />
</svelte:head>

<SectionHero />

<SectionWorks />

<SectionBlog />

<SectionAboutMe />

<SectionContact />

<style>
  /* your styles go here */
</style>