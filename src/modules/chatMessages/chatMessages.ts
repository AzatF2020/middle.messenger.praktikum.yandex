import { Component, connectStore, WSTransport } from '@core/index';
import ChatsController from '@controllers/ChatsController';
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

  public wssInstance: WSTransport;

  constructor(props: any) {
    super(props);

    this.state = {
      message: '',
      disabledSendButton: true,
      modalAddUserOpened: false,
      modalDeleteUserOpened: false,
    };

    this.chatsController = new ChatsController();

    this.wssInstance = new WSTransport(import.meta.env.VITE_BACKEND_WS);

    this.listeners = {
      openAddUserModal: this.openAddUserModal.bind(this),
      closeAddUserModal: this.closeAddUserModal.bind(this),
      openDeleteUserModal: this.openDeleteUserModal.bind(this),
      closeDeleteUserModal: this.closeDeleteUserModal.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      onSubmit: this.onSubmit.bind(this),
    };
  }

  public handleInputChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    this.setState({
      ...this.state,
      disabledSendButton: !value.trim().length,
      [name]: value,
    });
  }

  public async onSubmit(event: Event) {
    event.preventDefault();

    if (!window.store.getState().chatId) {
      await this.chatsController.createChat({
        title: window.store.getState().selectedUser.login,
      }, [window.store.getState().selectedUser.id]);
    }

    this.wssInstance.send(this.state.message);
    window.store.setState({ message: '' });

    this.resetFields(event);
  }

  public resetFields(event: Event) {
    const form = (event.target as HTMLButtonElement).closest('form');
    const inputs = form?.getElementsByTagName('input');

    if (!inputs) return;
    [...inputs].forEach(({ name }) => {
      this.setState({ ...this.state, [name]: '' });
    });
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
  selectedUser: state.selectedUser,
  messages: state.messages,
  loading: state.isChatLoading,
  chatId: state.chatId,
}));
