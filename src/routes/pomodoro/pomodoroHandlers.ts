export interface Pomodoro {
  state: 'work' | 'break' | 'stop';
  workTime: number;
  breakTime: number;
  intervalRef?: ReturnType<typeof setInterval>;
}

let timers: Pomodoro[] = [];

const clearTimer = (pomodoro: Pomodoro) => {
  if (pomodoro.intervalRef) {
    clearInterval(pomodoro.intervalRef);
    pomodoro.intervalRef = undefined;
  }
}

export const getPomodoro = () => timers[0];

export const startPomodoro = () => {
  console.log('start pom');
  if (timers.length < 1) {
    timers.push({
      state: 'stop',
      workTime: 25 * 60,
      breakTime: 5 * 60
    });
  }

  const pomodoro = timers[0];

  clearTimer(pomodoro)

  pomodoro.intervalRef = setInterval(() => {
    pomodoro.workTime--;
  }, 1000);

  timers[0].state = 'work'

};

export const pausePomodoro = () => {
  console.log('pause pom');
  
  if (timers.length < 1) {
    timers.push({
      state: 'stop',
      workTime: 25 * 60,
      breakTime: 5 * 60
    });
  }

  const pomodoro = timers[0];

  clearTimer(pomodoro)

  pomodoro.intervalRef = setInterval(() => {
    pomodoro.breakTime--;
  }, 1000);

  timers[0].state = 'break'
}

export const stopPomodoro = () => {
  if (timers.length < 1) {
    return;
  }

  const pomodoro = timers[0];

  clearTimer(pomodoro)

  timers[0].state = 'stop'
}

export const resetPomodoro = () => {
  if (timers.length < 1) {
    return;
  }

  const pomodoro = timers[0];

  clearTimer(pomodoro)

  timers = []
}

export const loadPomodoros = () => {
  // todo
}

export const persistPomodoros = () => {
  // todo
}
