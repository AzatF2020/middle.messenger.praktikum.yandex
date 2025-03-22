import { Component } from '@core/index';
import template from './template.hbs?raw';
import './style.scss';

type ListItemUserProps = {
  onClick: () => void;
  isActive: boolean;
  name: string | number;
  time: string | number;
  message: string | number;
  unreadMessages: string | number;
}

class ListItemUser extends Component {
  constructor(props: ListItemUserProps) {
    super(props);
    this.listeners = { click: this.props.onClick(this.props.name) };
  }

  public render() {
    return template;
  }
}

export default ListItemUser;
