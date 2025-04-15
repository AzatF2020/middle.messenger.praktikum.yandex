import { connectStore, Component } from '@core/index';
import UsersController from '@controllers/UsersController';
import ChatsController from '@controllers/ChatsController';
import template from './template.hbs?raw';
import './style.scss';

interface IModalAddUser {
  handleCloseAddModal(event: Event): void;

  closeByOverlay(event: Event): void;

  handleInputSearch(event: Event): void;

  onSubmit(event: Event): void;
}

type ModalAddUserProps = {
  handleCloseModal?: (event: Event) => void;

  isActive?: boolean;
};

class ModalAddUser extends Component implements IModalAddUser {
  public usersController: UsersController;

  public chatsController: ChatsController;

  constructor(props: ModalAddUserProps) {
    super(props);

    this.state = {
      search: '',
      selectedUsers: [],
    };

    this.usersController = new UsersController();

    this.chatsController = new ChatsController();

    this.listeners = {
      click: this.closeByOverlay.bind(this),
      handleInputSearch: this.handleInputSearch.bind(this),
      handleCloseAddModal: this.handleCloseAddModal.bind(this),
      onSubmit: this.onSubmit.bind(this),
    };
  }

  public handleCloseAddModal(event: Event) {
    window.store.setState({ searchedUserForAdd: [] });
    this.props.handleCloseModal(event);
  }

  public async handleInputSearch(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    if (value.length) {
      await this.usersController.searchUserForAdd({ login: value });
      this.setState({ ...this.state, [name]: value });
    } else {
      this.setState({ ...this.state, [name]: '' });
      window.store.setState({ searchedUserForAdd: [] });
    }
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

    if (!this.state.selectedUsers.length) return;

    await this.chatsController.addUserToChat(window.store.getState().chatId, this.state.selectedUsers);

    this.handleCloseAddModal(event);
  }

  public closeByOverlay(event: Event) {
    const modalInner = document.querySelector(
      '.user-add-modal__inner',
    ) as HTMLElement;

    if (!modalInner.contains(event.target as HTMLElement)) {
      this.handleCloseAddModal(event);
    }
  }

  public render() {
    return template;
  }
}

export default connectStore(ModalAddUser, (state) => ({
  searchedUserForAdd: state.searchedUserForAdd,
}));
