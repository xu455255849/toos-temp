function throttleAndDebounce(fn, delay, isThrottle) {
  let lastCallTime = 0, timer = null;
  return (...args) => {
    if (isThrottle) {
      const now = Date.now();
      if (now - lastCallTime < delay) return;
      lastCallTime = now;
      fn(...args)
    } else {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }
}

window.onscroll = throttleAndDebounce(function (...args) {
  console.log(...args)
}, 3000, true);