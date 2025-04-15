import { connectStore, Component } from '@core/index';
import UsersController from '@controllers/UsersController';
import template from './template.hbs?raw';
import './style.scss';

interface IModalAddUser {
  handleCloseModal(event: Event): void;

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

  constructor(props: ModalAddUserProps) {
    super(props);

    this.state = {
      search: '',
      selectedUsers: [],
    };

    this.usersController = new UsersController();

    this.listeners = {
      click: this.closeByOverlay.bind(this),
      handleInputSearch: this.handleInputSearch.bind(this),
      onSubmit: this.onSubmit.bind(this),
    };
  }

  public handleCloseModal!: (event: Event) => void;

  public async handleInputSearch(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    await this.usersController.searchUserForAdd({ login: value });

    this.setState({ ...this.state, [name]: value });
  }

  public onSubmit(event: Event) {
    event.preventDefault();
    const form = (event.currentTarget as HTMLButtonElement).closest('form')!;

    const formData = new FormData(form);

    const selectedUsers = [...formData.entries()].reduce((acc: number[], [name, value]:
      [string, FormDataEntryValue]) => {
      if (name !== 'search' && typeof value === 'string') { acc.push(Number(value)); }
      return acc;
    }, []);

    this.setState({ ...this.state, selectedUsers });
  }

  public closeByOverlay(event: Event) {
    const modalInner = document.querySelector(
      '.user-add-modal__inner',
    ) as HTMLElement;

    if (!modalInner.contains(event.target as HTMLElement)) {
      this.props.handleCloseModal(event);
    }
  }

  public render() {
    return template;
  }
}

export default connectStore(ModalAddUser, (state) => ({
  searchedUserForAdd: state.searchedUserForAdd,
}));
