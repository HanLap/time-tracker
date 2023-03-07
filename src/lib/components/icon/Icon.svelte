<script lang="ts">
	import { onMount } from 'svelte';
	import { icons, type IconType } from './icons';

	let clazz = '';
	export { clazz as class };

	export let name: IconType | undefined = undefined;

	let svg: String = '';

	$: element = svg.replace(/<svg[ \n]([^>]*)>/, '').replace('</svg>', '');

	$: (async () => {
		if (!name) {
			return;
		}

		svg = (await icons[name]()).default;
	})();
</script>

<svg
	class={`${clazz}`}
	fill="none"
	viewBox="0 0 24 24"
	stroke="currentColor"
	stroke-width="2"
>
	{@html element}
</svg>
