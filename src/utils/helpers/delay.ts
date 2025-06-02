const delay = (ms: number = 250) => new Promise((resolve) => { setTimeout(resolve, ms); });

export default delay;
