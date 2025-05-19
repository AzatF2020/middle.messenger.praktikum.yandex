import { Component } from '@core/index';
import formatTime from '@utils/helpers/formatTime';
import template from './template.hbs?raw';
import './style.scss';

type UserListItemProps = {
  onClick(value: string): void
  id: number
  title?: string;
  login: string;
  avatar?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  chatId?: number;
  unread_count?: number;
  my_login?: string;
  role?: string;
  last_message: object | null;
}

class UserListItem extends Component {
  constructor({ ...props }: UserListItemProps) {
    super(props);

    this.state = {
      storage: import.meta.env.VITE_BACKEND_STORAGE,
      last_message: this.props.last_message ? {
        ...this.props.last_message,
        time: formatTime(this.props.last_message.time),
      } : null,
    };

    this.listeners = { click: this.props?.onClick ? this.props?.onClick(this.props) : () => {} };
  }

  public render() {
    return template;
  }
}

export default UserListItem;
