import { Component } from '@core/index';
import template from './template.hbs?raw';
import './style.scss';

type UsersAddListProps = {
  usersSearchList: unknown[]
}

class UsersAddList extends Component {
  constructor(props: UsersAddListProps) {
    super(props);
  }

  public render() {
    return template;
  }
}

export default UsersAddList;
