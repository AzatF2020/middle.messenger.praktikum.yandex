import { Component } from '@core/index';
import template from './template.hbs?raw';
import './style.scss';

type UserListItemCheckboxProps = {
  id: number
  login: string;
  avatar?: string | null;
  first_name?: string;
  second_name?: string;
  display_name?: string;
}

class UserListItemCheckbox extends Component {
  constructor(props: UserListItemCheckboxProps) {
    super(props);

    this.state = {
      storage: import.meta.env.VITE_BACKEND_STORAGE,
    };
  }

  public render() {
    return template;
  }
}

export default UserListItemCheckbox;
