import { connectStore, Component } from '@core/index';
import ChatsController from '@controllers/ChatsController';
import template from './template.hbs?raw';
import './style.scss';

interface IModalDeleteUser {
  handleCloseModal(event: Event): void;

  closeByOverlay(event: Event): void;

  onSubmit(event: Event): void;
}

type ModalAddUserProps = {
  handleCloseModal?: (event: Event) => void;

  isActive?: boolean;
};

class ModalDeleteUser extends Component implements IModalDeleteUser {
  public handleCloseModal!: (event: Event) => void;

  public chatsController: ChatsController;

  constructor(props: ModalAddUserProps) {
    super(props);

    this.state = { selectedUsers: [] };

    this.chatsController = new ChatsController();

    this.listeners = {
      click: this.closeByOverlay.bind(this),
      onSubmit: this.onSubmit.bind(this),
    };
  }

  public async onSubmit(event: Event) {
    event.preventDefault();

    const form = (event.currentTarget as HTMLButtonElement).closest('form')!;

    const formData = new FormData(form);

    const selectedUsers = [...formData.entries()].reduce((acc: number[], [name, value]:
      [string, FormDataEntryValue]) => {
      if (name !== 'search' && typeof value === 'string') { acc.push(Number(value)); }
      return acc;
    }, []);

    this.setState({ ...this.state, selectedUsers });

    try {
      await this.chatsController.removeUsersFromChat(selectedUsers, this.props.chatId);
    } catch (error) {
      console.warn(error);
    } finally {
      this.props.handleCloseModal(event);
    }
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

export default connectStore(ModalDeleteUser, (state) => ({
  selectedChat: state.selectedChat,
  chatId: state.chatId,
  me: state.user,
}));
