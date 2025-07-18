# コード規約

## Svelte 4を禁止。 Svelte 5 の文法でコードを生成すること

### Reactivity syntax changes

let → $state

In Svelte 4, a let declaration at the top level of a component was implicitly reactive. In Svelte 5, things are more explicit: a variable is reactive when created using the $state rune. Let’s migrate the counter to runes mode by wrapping the counter in $state:

```
<script>
	let count = $state(0);
</script>
```

Nothing else changes. count is still the number itself, and you read and write directly to it, without a wrapper like .value or getCount().

$: → $derived/$effect

In Svelte 4, a $: statement at the top level of a component could be used to declare a derivation, i.e. state that is entirely defined through a computation of other state. In Svelte 5, this is achieved using the $derived rune:

<script>
	let count = $state(0);
	$: const double = $derived(count * 2);
</script>

As with $state, nothing else changes. double is still the number itself, and you read it directly, without a wrapper like .value or getDouble().

### Event handlers

Event handlers have been given a facelift in Svelte 5. Whereas in Svelte 4 we use the on: directive to attach an event listener to an element, in Svelte 5 they are properties like any other (in other words - remove the colon):

<script>
	let count = $state(0);
</script>

<button on:click={() => count++}>
	clicks: {count}
</button>

Since they’re just properties, you can use the normal shorthand syntax...

<script>
	let count = $state(0);

	function onclick() {
		count++;
	}
</script>

<button {onclick}>
	clicks: {count}
</button>

...though when using a named event handler function it’s usually better to use a more descriptive name.

### Using `<slot>` to render parent content is deprecated. Use `{@render ...}` tags instead

Snippets instead of slots

In Svelte 4, the easiest way to pass a piece of UI to the child was using a <slot />. In Svelte 5, this is done using the children prop instead, which is then shown with {@render children()}:

<script>
	let { children } = $props();
</script>

<slot />
{@render children?.()}

### 'page' is deprecated

@deprecated Use `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))

### Cannot use `export let` in runes mode — use `$props()` instead

use rune `$props()`

https://svelte.dev/e/legacy_export_invalid

### Each block should have a key

[svelte/require-each-key](https://sveltejs.github.io/eslint-plugin-svelte/rules/require-each-key/)

