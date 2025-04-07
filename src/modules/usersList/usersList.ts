import { Component, connectStore } from '@core/index';
import ChatsController from '@controllers/ChatsController';
import template from './template.hbs?raw';
import './style.scss';

type ListItemUserProps = {
  data: any[]
}

class UsersList extends Component {
  public chatsController: ChatsController;

  constructor(props: ListItemUserProps) {
    super(props);

    this.chatsController = new ChatsController();
    this.listeners = { handleOpenUserChat: this.handleOpenUserChat.bind(this) };
  }

  public handleOpenUserChat(value: Record<string, any>) {
    return async () => {
      /* Если пользователь был выбран из списка поиска, то открываем его чат. */
      if (value.login) {
        const chatId = window.store.getState()
          .userChats.find(({ title }: { title: string }) => title === value.login)?.id;

        /* Если пользователь был найден в чате и есть начатый диалог, то открываем существующий. */
        if (chatId) {
          await this.chatsController.openHandleChat(chatId);
        } else {
          window.router.go('/messenger', value.login);
          window.store.setState({ chatId: null, selectedUser: { ...value, is_selected: true } });
        }
      } else {
        /* Получаем пользователя, если чат был с ним ранее создан. *ID чата */
        await this.chatsController.openHandleChat(value.id);
      }
    };
  }

  public render() {
    return template;
  }
}

export default connectStore(UsersList, (state) => ({
  chatId: state.chatId,
  myLogin: state.user?.login,
}));
