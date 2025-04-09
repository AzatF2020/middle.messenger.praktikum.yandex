import { Component, connectStore } from '@core/index';
import ChatsController from '@controllers/ChatsController';
import scrollToBottom from '@utils/constants/scrollToBottom';
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
    };

    this.chatsController = new ChatsController();

    this.listeners = {
      openAddUserModal: this.openAddUserModal.bind(this),
      closeAddUserModal: this.closeAddUserModal.bind(this),
      openDeleteUserModal: this.openDeleteUserModal.bind(this),
      closeDeleteUserModal: this.closeDeleteUserModal.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      scrollToBottomOnBlur: this.scrollToBottomOnBlur.bind(this),
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

    // target.focus();
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

      scrollToBottom('.chat-messages-list');
    }
  }

  public async scrollToBottomOnBlur() {

  }

  public resetFields() {
    this.setState({ ...this.state, message: '' });
  }

  public openAddUserModal() {
    this.setState({ ...this.state, modalAddUserOpened: true });
  }

  public closeAddUserModal() {
    this.setState({ ...this.state, modalAddUserOpened: false });
  }

  public openDeleteUserModal() {
    this.setState({ ...this.state, modalDeleteUserOpened: true });
  }

  public closeDeleteUserModal() {
    this.setState({ ...this.state, modalDeleteUserOpened: false });
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
