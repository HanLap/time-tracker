<script lang="ts">
	import Icon from './icon/Icon.svelte';

	export let onClose: () => void;
</script>

<div
	on:click={onClose}
	on:keypress={onClose}
	class="fixed top-0 left-0 h-full w-full bg-black opacity-25"
/>
<div class="pointer-events-none fixed top-0 left-0 flex h-full w-full items-center justify-center">
	<div
		class="pointer-events-auto bg-zinc-0 h-48 w-96 rounded-md border border-gray-50 bg-zinc-50 dark:bg-gray-800 dark:border-gray-600 text-gray-900 shadow-2xl mx-2 dark:text-zinc-50"
	>
		<div class="flex flex-col h-full">
			<div class="flex justify-end p-2 border-b border-gray-700">
				<button on:click={onClose}>
					<Icon name="x-mark" class="h-4 w-4 text-gray-400" />
				</button>
			</div>
			<div class="grow">
				<slot name="body" />
			</div>
			{#if $$slots.bar}
				<div class="p-2 h-8">
					<slot name="bar" />
				</div>
			{/if}
		</div>
	</div>
</div>
