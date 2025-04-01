import { Component } from '@core/index';
import template from './template.hbs?raw';
import './style.scss';

type ListItemUserProps = {
  data: any[]
}

class UsersList extends Component {
  constructor(props: ListItemUserProps) {
    super(props);

    this.listeners = { handleOpenByLogin: this.handleOpenByLogin.bind(this) };
  }

  public handleOpenByLogin(value: Record<string, any>) {
    return () => {
      window.router.go('/messenger', value.login);

      window.store.setState({ selectedChat: { ...value, is_selected: true } });
    };
  }

  public render() {
    return template;
  }
}

export default UsersList;
