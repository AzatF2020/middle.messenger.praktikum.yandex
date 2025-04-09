const scrollToBottom = (className: string) => {
  const element = document.querySelector(className) as HTMLElement;
  if (!element) return;
  element.scrollTop = element.scrollHeight;
};

export default scrollToBottom;
