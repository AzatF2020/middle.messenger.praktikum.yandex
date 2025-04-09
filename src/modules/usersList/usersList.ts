import { Component, connectStore } from '@core/index';
import ChatsController from '@controllers/ChatsController';
import initialState from '@utils/constants/initialState';
import template from './template.hbs?raw';
import './style.scss';

type ListItemUserProps = {
  data: any[]
}

class UsersList extends Component {
  public chatsController: ChatsController;

  constructor(props: ListItemUserProps) {
    super(props);

    this.state = {
      modalCreateChatOpened: false,
    };

    this.chatsController = new ChatsController();
    this.listeners = {
      handleOpenUserChat: this.handleOpenUserChat.bind(this),
      openCreateChatModal: this.openCreateChatModal.bind(this),
      closeCreateChatModal: this.closeCreateChatModal.bind(this),
    };
  }

  public handleOpenUserChat(value: Record<string, any>) {
    return async () => {
      /* Если пользователь был выбран из списка поиска, то открываем его чат. */
      if (value.login) {
        window.store.setState({
          chatId: null,
          token: null,
          messages: [],
          selectedChat: initialState().selectedChat,
          selectedUserOnSearch: { ...value },
        });

        this.openCreateChatModal();
      } else {
        /* Получаем пользователя, если чат был с ним ранее создан. *ID чата */
        await this.chatsController.openHandleChat(value.id);
      }
    };
  }

  public openCreateChatModal() {
    this.setState({ ...this.state, modalCreateChatOpened: true });
  }

  public closeCreateChatModal() {
    window.store.setState({
      selectedUserOnSearch: initialState().selectedUserOnSearch,
    });

    this.setState({ ...this.state, modalCreateChatOpened: false });
  }

  public render() {
    return template;
  }
}

export default connectStore(UsersList, (state) => ({
  chatId: state.chatId,
  myLogin: state.user?.login,
}));
