import Component from '@core/Component';
import ChatsController from '@controllers/ChatsController';
import template from './template.hbs?raw';
import './style.scss';

interface IModalDeleteGroup {
  closeByOverlay(event: Event): void;
}

type ModalDeleteGroupProps = {
  handleCloseModal: (event: Event) => void;

  isActive: boolean;
};

class ModalDeleteGroup extends Component implements IModalDeleteGroup {
  public chartsController: ChatsController;

  constructor(props: ModalDeleteGroupProps) {
    super(props);

    this.chartsController = new ChatsController();

    this.listeners = {
      click: this.closeByOverlay.bind(this),
      handleDeleteChat: this.handleDeleteChat.bind(this),
    };
  }

  public async handleDeleteChat() {
    await this.chartsController.deleteChat();
    this.props.handleCloseModal();
  }

  public closeByOverlay(event: Event) {
    const modalInner = document.querySelector(
      '.group-delete-modal__inner',
    ) as HTMLElement;

    if (!modalInner.contains(event.target as HTMLElement)) {
      this.props.handleCloseModal(event);
    }
  }

  public render() {
    return template;
  }
}

export default ModalDeleteGroup;
