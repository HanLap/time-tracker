export const timerString = (timer: number) => {
	const sign = timer < 0;

	return (sign ? '-' : '') + new Date((sign ? -1 : 1) * timer * 1000).toISOString().slice(14, 19);
};
