<script>
	import Dialog from '$lib/components/Dialog.svelte';
	import Icon from '$lib/components/icon/Icon.svelte';
	import '../app.css';
</script>

<div class="mb-5 flex h-14 w-full items-center border-b-2 border-zinc-100 dark:border-gray-700 p-3 dark:text-gray-500 text-gray-300">
	<a href="/"><Icon name="chevron-left" class="h-6 w-6"/></a>
</div>
<div class="container mx-auto">
	<slot />
</div>

<style lang="postcss">
	:global(body) {
			background-color: theme(colors.zinc.50);
			color: theme(colors.gray.900);
	}

	@media (prefers-color-scheme: dark) {
		:global(body) {
			background-color: theme(colors.gray.900);
			color: theme(colors.zinc.50);
		}
	}
</style>