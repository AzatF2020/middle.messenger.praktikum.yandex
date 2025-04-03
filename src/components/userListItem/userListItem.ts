import { Component } from '@core/index';
import template from './template.hbs?raw';
import './style.scss';

type UserListItemProps = {
  onClick(value: string): void
  title?: string;
  login: string;
  avatar: string | null;
  first_name?: string;
  second_name?: string;
  display_name?: string;
}

class UserListItem extends Component {
  constructor(props: UserListItemProps) {
    super(props);

    this.state = { storage: import.meta.env.VITE_BACKEND_STORAGE };
    this.listeners = { click: this.props.onClick(this.props) };
  }

  public render() {
    return template;
  }
}

export default UserListItem;
