import Component from '@core/Component';
import template from './template.hbs?raw';
import './style.scss';

interface IPopupAttachments {
  togglePopup(event: Event): void;
}

type PopupAttachmentsProps = {
  openModalSendMediaModal(): void
}

class PopupAttachments extends Component implements IPopupAttachments {
  constructor(props: PopupAttachmentsProps) {
    super(props);

    this.listeners = {
      togglePopup: this.togglePopup.bind(this),
      openModalSendMediaModal: this.props.openModalSendMediaModal,
    };
  }

  public componentDidMount() {
    window.addEventListener('click', this.togglePopup.bind(this));
  }

  public componentWillUnmount() {
    window.removeEventListener('click', this.togglePopup.bind(this));
  }

  public togglePopup(event: Event) {
    const popupWrapper = document.querySelector(
      '.popup-attachments__button-attach-wrapper',
    );
    const popup = popupWrapper!.querySelector('.popup');
    const button = popupWrapper!.querySelector(
      '.popup-attachments__button-attach',
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

export default PopupAttachments;
