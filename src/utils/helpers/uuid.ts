const uuid = (): string => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    // eslint-disable-next-line eqeqeq
    const v = c == 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });

export default uuid;
