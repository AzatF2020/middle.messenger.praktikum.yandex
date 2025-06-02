function debounce<T extends(...args: Parameters<T>) => void>(cb: T, wait = 20) {
  let timeout: ReturnType<typeof setTimeout>;
  const callable = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(...args), wait);
  };
  return callable as T;
}

export default debounce;
