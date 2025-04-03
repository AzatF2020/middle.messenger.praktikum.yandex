import { Component } from '@core/index';
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
    this.listeners = { handleOpenByLogin: this.handleOpenByLogin.bind(this) };
  }

  public handleOpenByLogin(value: Record<string, any>) {
    return async () => {
      if (value.login) {
      /* Получаем пользователя, при поиске */
        window.router.go('/messenger', value.login);

        window.store.setState({ selectedUser: { ...value, is_selected: true } });
      } else {
      /* Получаем пользователя, если чат был с ним ранее создан. *ID чата */
        await this.chatsController.getChatUsers(value.id);
      }
    };
  }

  public render() {
    return template;
  }
}

export default UsersList;
