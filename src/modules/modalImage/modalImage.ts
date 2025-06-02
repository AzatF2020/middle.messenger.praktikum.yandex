import Component from '@core/Component';
import template from './template.hbs?raw';
import './style.scss';

interface IModalImage {
  handleCloseModal(event: Event): void;

  closeByOverlay(event: Event): void;
}

type ModalImageProps = {
  handleCloseModal?: (event: Event) => void;
  isActive?: boolean;
  imgSource: string;
};

class ModalImage extends Component implements IModalImage {
  constructor(props: ModalImageProps) {
    super(props);

    this.listeners = {
      click: this.closeByOverlay.bind(this),
    };
  }

  public handleCloseModal!: (event: Event) => void;

  public closeByOverlay(event: Event) {
    const modalInner = document.querySelector(
      '.modal-image__inner',
    ) as HTMLElement;

    if (!modalInner.contains(event.target as HTMLElement)) {
      this.props.handleCloseModal(event);
    }
  }

  public render() {
    return template;
  }
}

export default ModalImage;
