let timerId: number;

const debounce = (func: Function, delay: number) => {
  clearTimeout(timerId);
  timerId = setTimeout(func, delay);
};

export default debounce;
