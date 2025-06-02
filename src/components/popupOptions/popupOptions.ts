import Component from '@core/Component';
import template from './template.hbs?raw';
import './style.scss';

interface IPopupOptions {
  togglePopup(event: Event): void;
}

type PopupProps = {
  openAddUserModal(): void;

  openDeleteGroupModal(): void;

  openDeleteUserModal(): void;
};

class PopupOptions extends Component implements IPopupOptions {
  constructor(props: PopupProps) {
    super(props);

    this.listeners = {
      togglePopup: this.togglePopup.bind(this),
    };
  }

  public componentDidMount() {
    window.addEventListener('click', this.togglePopup.bind(this));
  }

  public componentWillUnmount() {
    window.removeEventListener('click', this.togglePopup.bind(this));
  }

  public togglePopup(event: Event) {
    const popupWrapper = document.querySelector('.popup-options');

    if (!popupWrapper) return;

    const popup = popupWrapper!.querySelector('.popup');
    const button = popupWrapper!.querySelector(
      '.popup-options__button-more',
    );

    if (
      button?.contains(event.target as HTMLElement)
        && popup?.classList.contains('popup--active')
    ) {
      popup?.classList.remove('popup--active');
      return;
    }

    popupWrapper!.contains(event.target as HTMLElement)
      ? popup?.classList.add('popup--active')
      : popup?.classList.remove('popup--active');
  }

  public render() {
    return template;
  }
}

export default PopupOptions;
