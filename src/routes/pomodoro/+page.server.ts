import {
	getPomodoro,
	pausePomodoro,
	resetPomodoro,
	startPomodoro,
	stopPomodoro,
	type Pomodoro
} from './pomodoroHandlers';
import type { Actions, PageServerLoad } from './$types';

export const load = ((): Pomodoro => {
	const pomodoro = getPomodoro();

	if (pomodoro) {
		return {
			...pomodoro,
			intervalRef: undefined
		};
	}

	return {
		state: 'stop',
		workTime: 25 * 60,
		breakTime: 5 * 60
	};
}) satisfies PageServerLoad;

export const actions = {
	start: startPomodoro,
	pause: pausePomodoro,
	stop: stopPomodoro,
	reset: resetPomodoro
} satisfies Actions;
