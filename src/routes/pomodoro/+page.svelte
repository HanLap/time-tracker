<script lang="ts">
	import { enhance } from '$app/forms';
	import Card from '$lib/components/Card.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Icon from '$lib/components/icon/Icon.svelte';
	import type { IconType } from '$lib/components/icon/icons';
	import { timerString } from '$lib/formattingUtil';
	import { onDestroy, onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const workDuration = 5;
	const breakDuration = 5;

	let state = data.state;
	let workTime = data.workTime;
	let breakTime = data.breakTime;
	let intervalRef: any = undefined;

	let showDialog: boolean = false;

	let icon: IconType = 'play';
	$: if (state === 'work') {
		icon = 'pause';
	} else {
		icon = 'play';
	}

	const setWorkTimer = () => {
		intervalRef = setInterval(() => {
			workTime--;
			if (workTime <= 0) {
				clearInterval(intervalRef);
				new Notification('Work Interval Finished', { body: 'Take a break!' }).addEventListener(
					'click',
					() => {
						setBreakTimer();
						state = 'break';
					}
				);
			}
		}, 1000);
	};

	const setBreakTimer = () => {
		intervalRef = setInterval(() => {
			breakTime--;
			if (breakTime <= 0) {
				clearInterval(intervalRef);
				new Notification('Break Interval Finished', { body: 'Start working!' }).addEventListener(
					'click',
					() => {
						state = 'work';
					}
				);
			}
		}, 1000);
	};

	const handleNotificationPermission = async () => {
		if (!('Notification' in window)) {
			console.log('browser does not support notifications');
			return;
		}

		await Notification.requestPermission();
	};

	const startClicked = () => {
		handleNotificationPermission();

		if (state === 'work') {
			clearInterval(intervalRef);
			setBreakTimer();
			state = 'break';
			workTime = workDuration;
		} else {
			clearInterval(intervalRef);
			setWorkTimer();
			state = 'work';
			breakTime = breakDuration;
		}
	};

	const stopClicked = () => {
		if (!intervalRef) {
			return;
		}

		clearInterval(intervalRef);

		state = 'stop';
	};

	const resetClicked = () => {
		stopClicked();

		workTime = workDuration;
		breakTime = breakDuration;
	};

	onMount(() => {
		if (state == 'work') {
			setWorkTimer();
		}

		if (state == 'break') {
			setBreakTimer();
		}
	});

	onDestroy(() => {
		if (intervalRef) {
			clearInterval(intervalRef);
		}
	});
</script>

{#if showDialog}
	<Dialog onClose={() => (showDialog = false)}>
		<div slot="body" class="flex justify-center items-center mt-5">Work Interval Finished</div>
		<!-- <div slot="bar" class="flex justify-center">Okay</div> -->
	</Dialog>
{/if}
<button
	on:click={() => (showDialog = true)}
	class="rounded-md bg-pink-800 p-1 px-2 text-zinc-50 transition hover:bg-pink-700"
	>show dialog</button
>
<form
	method="POST"
	use:enhance={() => {
		return ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<div class="flex justify-center pt-10">
		<Card>
			<div class="flex flex-nowrap justify-between gap-5">
				<div>
					<div
						class="w-56 text-7xl text-end"
						class:font-bold={state === 'work'}
						class:font-thin={state === 'break'}
					>
						{timerString(workTime)}
					</div>
					<div
						class="w-56 text-5xl text-end font-thin"
						class:font-bold={state === 'break'}
						class:font-thin={state === 'work'}
					>
						{timerString(breakTime)}
					</div>
				</div>

				<div>
					<button
						on:click={startClicked}
						formaction="?/pause"
						class="m-auto w-fit p-1 rounded-full bg-pink-800 hover:bg-pink-700 transition"
					>
						<Icon name={icon} class="h-20 w-20 text-zinc-50" />
					</button>
					<div class="flex justify-end">
						<button on:click={stopClicked} formaction="?/stop">
							<Icon name="stop" class="h-7 w-7 text-pink-300 transition hover:text-pink-200" />
						</button>
						<button on:click={resetClicked} formaction="?/reset">
							<Icon
								name="arrow-path"
								class="h-7 w-7 text-pink-300 transition hover:text-pink-200"
							/>
						</button>
					</div>
				</div>
			</div>
		</Card>
	</div>
</form>
