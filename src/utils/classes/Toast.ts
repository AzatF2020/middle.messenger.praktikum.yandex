import uuid from '@utils/helpers/uuid';

type ToastSeverity = 'success' | 'info' | 'error' | 'warning'

type ToastPropsAdd = {
  life: number;
  severity: ToastSeverity
  summary?: string;
  detail?: string;
  verticalDirection?: string;
  horizontalDirection?: string;
}

type ToastProps = {
  container?: HTMLElement;
  gutter?: number;
  delayToRemove?: number;
}

interface IToast {
  addToast({
    life, severity, summary, detail,
  }: ToastPropsAdd): void

  removeToast(id: string): void;

  clearAllToasts(): void
}

class Toast implements IToast {
  private toasts: { [id: string]: {
    element: HTMLElement
    timeout?: ReturnType<typeof setTimeout>
    posY: number
    offsetHeight: number,
    verticalDirection: string;
    horizontalDirection: string;}
  } = {};

  private stateСlasses = {
    initial: 'initial',
    hide: 'hide',
    show: 'show',
  };

  public gutter!: number;

  public delayToRemove!: number;

  public container!: HTMLElement;

  constructor({
    container = document.body,
    gutter = 10,
    delayToRemove = 500,
  }: ToastProps) {
    this.container = container;
    this.gutter = gutter;
    this.delayToRemove = delayToRemove;
  }

  private _generateHTMLStructure({
    handleRemove,
    summary,
    detail,
    severity = 'info' as ToastSeverity,
  }: { handleRemove: (item: any) => void,
    summary?: string,
    detail?: string,
    severity?: ToastSeverity
  }): { element: HTMLElement, id: string } {
    const id = uuid();

    const toastItem = Object.assign(document.createElement('div'), {
      className: `toast-item initial ${severity ?? 'info'}`,
      id,
    }) as HTMLElement;

    const HTMLString = `
      <div class="toast-item__wrapper">
        <div class="toast-item__message-container">
          <span class="toast-item__message-summary">${summary ?? ''}</span>
          <p class="toast-item__message-detail">${detail ?? ''}</p>
        </div>
        <button class="toast-item__close-button" type="button">
          <img src="/icons/close.svg" alt="close"/>
        </button>
      </div>
    `;

    toastItem.innerHTML = HTMLString;

    toastItem.querySelector('button')?.addEventListener('click', () => { handleRemove(id); });

    return {
      element: toastItem,
      id,
    };
  }

  private _handleRemove(id: string) {
    const toastToRemove = this.toasts[id];

    if (!toastToRemove) return;

    toastToRemove.element.classList.remove(this.stateСlasses.show);
    toastToRemove.element.classList.add(this.stateСlasses.hide);

    setTimeout(() => {
      toastToRemove.element.remove();

      if (this.toasts[id]?.timeout) {
        clearTimeout(this.toasts[id].timeout);
      }

      const { [id]: _, ...rest } = this.toasts;
      this.toasts = rest;
    }, this.delayToRemove);

    [...document.querySelectorAll('.toast-item')]
      .filter((item) => item.getAttribute('id') !== id)
      .forEach((item) => {
        const itemId = item.getAttribute('id')!;
        const currentToast = this.toasts[itemId];

        if (currentToast.posY > toastToRemove.posY) {
          currentToast.posY -= toastToRemove.offsetHeight + this.gutter;
          (item as HTMLElement).style.transform = `translateY(${currentToast.posY}px)`;
        }
      });
  }

  public addToast({
    life = 0,
    severity = 'info',
    summary,
    detail,
    verticalDirection = 'top',
    horizontalDirection = 'right',
  }: ToastPropsAdd) {
    const { element, id } = this._generateHTMLStructure({
      handleRemove: this._handleRemove.bind(this),
      summary,
      detail,
      severity,
    });

    this.container?.prepend(element);

    element.classList.add(this.stateСlasses.show);

    this.toasts[id] = {
      offsetHeight: element.offsetHeight,
      verticalDirection,
      horizontalDirection,
      element,
      posY: 0,
    };

    [...document.querySelectorAll('.toast-item')].forEach((toast, index) => {
      const toastID = toast.getAttribute('id')!;
      let posY = 0;

      for (let i = 0; i < index; i += 1) {
        const prevToastID = [...document.querySelectorAll('.toast-item')][i].getAttribute('id')!;
        const prevToast = this.toasts[prevToastID];
        posY += prevToast.element.offsetHeight + this.gutter;
      }

      this.toasts[toastID].posY = posY;
      this.toasts[toastID].element.style.transform = `translateY(${posY}px)`;
      this.toasts[toastID].element.classList.add(horizontalDirection);
      this.toasts[toastID].element.classList.add(verticalDirection);
    });

    if (life === 0 || life === null || life === undefined || !life) return;

    const timeout = setTimeout(() => {
      this._handleRemove(id);
    }, life);

    this.toasts[id] = { ...this.toasts[id], timeout };
  }

  public removeToast(id: string) {
    this._handleRemove(id);
  }

  public clearAllToasts() {
    if (!Object.values(this.toasts)?.length) return;

    Object.values(this.toasts).forEach((
      { element, timeout }: { element: HTMLElement, timeout?: ReturnType<typeof setTimeout> },
    ) => {
      element.remove();

      if (timeout) {
        clearTimeout(timeout);
      }
    });

    this.toasts = {};
  }
}

export default Toast;
