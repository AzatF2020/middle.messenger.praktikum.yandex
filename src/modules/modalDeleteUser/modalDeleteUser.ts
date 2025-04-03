import Component from '@core/Component';
import ChatsController from '@controllers/ChatsController';
import template from './template.hbs?raw';
import './style.scss';

interface IModalDeleteUser {
  closeByOverlay(event: Event): void;
  handleInputChange(event: Event): void;
}

type ModalDeleteUserProps = {
  handleCloseModal: (event: Event) => void;
  isActive: boolean;
};

class ModalDeleteUser extends Component implements IModalDeleteUser {
  public chartsController: ChatsController;

  constructor(props: ModalDeleteUserProps) {
    super(props);

    this.chartsController = new ChatsController();

    this.state = { login: '' };

    this.listeners = {
      click: this.closeByOverlay.bind(this),
      handleDeleteChat: this.handleDeleteChat.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
    };
  }

  public async handleDeleteChat() {
    await this.chartsController.deleteChat();
    this.props.handleCloseModal();
  }

  public handleInputChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  public closeByOverlay(event: Event) {
    const modalInner = document.querySelector(
      '.user-delete-modal__inner',
    ) as HTMLElement;

    if (!modalInner.contains(event.target as HTMLElement)) {
      this.props.handleCloseModal(event);
    }
  }

  public render() {
    return template;
  }
}

export default ModalDeleteUser;
