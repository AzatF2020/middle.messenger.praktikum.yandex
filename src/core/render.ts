import { Component } from '.';

const render = (block: Component): HTMLElement | null => {
  const root: HTMLElement = document.querySelector('#app')!;

  if (!root) return null;

  root.innerHTML = '';

  block.eventBus().emit(Component.EVENTS.INIT);

  if (!block.getElement!) return null;

  root.appendChild(block.getElement!);

  block.eventBus().emit(Component.EVENTS.FLOW_CDM);

  block.eventBus().emit(Component.EVENTS.FLOW_CWU);

  return root;
};

export default render;
