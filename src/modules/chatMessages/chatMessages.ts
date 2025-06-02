import { Component, connectStore } from '@core/index';
import ChatsController from '@controllers/ChatsController';
import debounce from '@utils/helpers/debounce';
import template from './template.hbs?raw';
import './style.scss';

interface IChatMessages {
  openAddUserModal(): void;

  closeAddUserModal(): void;

  openDeleteGroupModal(): void;

  closeDeleteGroupModal(): void;

  openDeleteUserModal(): void;

  closeDeleteUserModal(): void;

  handleInputChange(event: Event): void;

  onSubmit(event: Event): void;
}

class ChatMessages extends Component implements IChatMessages {
  public chatsController: ChatsController;

  constructor(props?: Record<string, unknown>) {
    super(props);

    this.state = {
      message: '',
      disabledSendButton: true,
      modalAddUserOpened: false,
      modalDeleteGroupOpened: false,
      modalSendMediaOpened: false,
      modalChatInfoOpened: false,
      modalDeleteUserOpened: false,
    };

    this.chatsController = new ChatsController();

    this.listeners = {
      openAddUserModal: this.openAddUserModal.bind(this),
      closeAddUserModal: this.closeAddUserModal.bind(this),

      openDeleteGroupModal: this.openDeleteGroupModal.bind(this),
      closeDeleteGroupModal: this.closeDeleteGroupModal.bind(this),

      openDeleteUserModal: this.openDeleteUserModal.bind(this),
      closeDeleteUserModal: this.closeDeleteUserModal.bind(this),

      openModalSendMediaModal: this.openModalSendMediaModal.bind(this),
      closeModalSendMediaModal: this.closeModalSendMediaModal.bind(this),

      openChatModalInfo: this.openChatModalInfo.bind(this),
      closeChatModalInfo: this.closeChatModalInfo.bind(this),

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

  // # Добавление пользователя в чат
  public openAddUserModal() {
    this.setState({ ...this.state, modalAddUserOpened: true });
  }

  public closeAddUserModal() {
    this.setState({ ...this.state, modalAddUserOpened: false });
  }

  // # Удаление пользователя из чата
  public openDeleteUserModal() {
    this.setState({ ...this.state, modalDeleteUserOpened: true });
  }

  public closeDeleteUserModal() {
    this.setState({ ...this.state, modalDeleteUserOpened: false });
  }

  // # Удаление чата
  public openDeleteGroupModal() {
    this.setState({ ...this.state, modalDeleteGroupOpened: true });
  }

  public closeDeleteGroupModal() {
    this.setState({ ...this.state, modalDeleteGroupOpened: false });
  }

  // # Отправка изображений
  public openModalSendMediaModal() {
    this.setState({ ...this.state, modalSendMediaOpened: true });
  }

  public closeModalSendMediaModal() {
    this.setState({ ...this.state, modalSendMediaOpened: false });
  }

  // # Инфо о группе
  public openChatModalInfo() {
    this.setState({ ...this.state, modalChatInfoOpened: true });
  }

  public closeChatModalInfo() {
    this.setState({ ...this.state, modalChatInfoOpened: false });
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
