import { Component, connectStore } from '@core/index';
import ChatsController from '@controllers/ChatsController';
import debounce from '@utils/helpers/debounce';
import template from './template.hbs?raw';
import './style.scss';

interface IChatMessages {
  openAddUserModal(): void;

  closeAddUserModal(): void;

  openDeleteUserModal(): void;

  closeDeleteUserModal(): void;

  handleInputChange(event: Event): void;

  onSubmit(event: Event): void;
}

class ChatMessages extends Component implements IChatMessages {
  public chatsController: ChatsController;

  constructor(props: any) {
    super(props);

    this.state = {
      message: '',
      disabledSendButton: true,
      modalAddUserOpened: false,
      modalDeleteUserOpened: false,
      modalSendMediaOpened: false,
    };

    this.chatsController = new ChatsController();

    this.listeners = {
      openAddUserModal: this.openAddUserModal.bind(this),
      closeAddUserModal: this.closeAddUserModal.bind(this),
      openDeleteUserModal: this.openDeleteUserModal.bind(this),
      closeDeleteUserModal: this.closeDeleteUserModal.bind(this),
      openModalSendMediaModal: this.openModalSendMediaModal.bind(this),
      closeModalSendMediaModal: this.closeModalSendMediaModal.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      onSubmitByEnter: debounce(this.onSubmitByEnter.bind(this), 250),
      onSubmit: this.onSubmit.bind(this),
    };
  }

  public async handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;

    this.setState({
      ...this.state,
      disabledSendButton: !value.trim().length,
      [name]: value,
    });
  }

  public async onSubmit(event: Event) {
    event.preventDefault();

    await this.chatsController.sendChatMessage(this.state.message);

    this.resetFields();
  }

  public async onSubmitByEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();

      await this.chatsController.sendChatMessage(this.state.message);

      (event.target as HTMLInputElement).focus();

      this.resetFields();
    }
  }

  public resetFields() {
    this.setState({ ...this.state, message: '' });
  }

  // # Добавление пользователя в чат
  public openAddUserModal() {
    this.setState({ ...this.state, modalAddUserOpened: true });
  }

  public closeAddUserModal() {
    this.setState({ ...this.state, modalAddUserOpened: false });
  }

  // # Удаление чата
  public openDeleteUserModal() {
    this.setState({ ...this.state, modalDeleteUserOpened: true });
  }

  public closeDeleteUserModal() {
    this.setState({ ...this.state, modalDeleteUserOpened: false });
  }

  public openModalSendMediaModal() {
    this.setState({ ...this.state, modalSendMediaOpened: true });
  }

  public closeModalSendMediaModal() {
    this.setState({ ...this.state, modalSendMediaOpened: false });
  }

  public render() {
    return template;
  }
}

export default connectStore(ChatMessages, (state) => ({
  selectedChat: state.selectedChat,
  messages: state.messages,
  loading: state.isChatLoading,
  chatId: state.chatId,
}));
