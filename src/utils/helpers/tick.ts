const tick = (fn: Function = () => {}) => Promise.resolve().then((event) => fn(event));

export default tick;
