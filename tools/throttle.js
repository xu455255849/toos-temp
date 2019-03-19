const throttle = function (fn, delay, isDebounce) {
  let timer;
  let lastCall = 0;
  console.log(22);
  return function (...args) {
    if (isDebounce) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        console.log(2222);
        fn(...args)
      }, delay)
    } else {
      const now = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      fn(...args)
    }
  }
};