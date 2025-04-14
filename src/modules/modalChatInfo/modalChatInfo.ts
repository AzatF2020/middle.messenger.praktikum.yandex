import { Component, connectStore } from '@core/index';
import template from './template.hbs?raw';
import './style.scss';

interface IModalChatInfo {
  handleCloseModal(event: Event): void;

  closeByOverlay(event: Event): void;
}

type ModalChatInfoProps = {
  handleCloseModal?: (event: Event) => void;
  isActive?: boolean;
};

class ModalChatInfo extends Component implements IModalChatInfo {
  constructor(props: ModalChatInfoProps) {
    super(props);

    this.listeners = {
      click: this.closeByOverlay.bind(this),
    };
  }

  public handleCloseModal!: (event: Event) => void;

  public closeByOverlay(event: Event) {
    const modalInner = document.querySelector(
      '.modal-chat-info__inner',
    ) as HTMLElement;

    if (!modalInner.contains(event.target as HTMLElement)) {
      this.props.handleCloseModal(event);
    }
  }

  public render() {
    return template;
  }
}

export default connectStore(ModalChatInfo, (state) => ({
  selectedChat: state?.selectedChat,
}));
