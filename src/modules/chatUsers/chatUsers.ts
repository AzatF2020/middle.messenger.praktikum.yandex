import Component from '@core/Component';
import chats from '@utils/pages-data/chats';
import template from './template.hbs?raw';
import './style.scss';

interface IChatUsers {
    searchUsers: (value: string) => void;
    handleInputChange: (event: Event) => void;
}

class ChatUsers extends Component implements IChatUsers {
  constructor() {
    super();

    // eslint-disable-next-line react/no-unused-state
    this.state = { data: chats, message: '' };
    this.listeners = {
      handleInputChange: this.handleInputChange.bind(this),
    };
  }

  public handleInputChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    this.setState({
      // eslint-disable-next-line react/no-unused-state
      data: this.searchUsers(value),
      [name]: value.trim(),
    });
  }

  public searchUsers(value: string) {
    const usersBySearch = chats.filter(
      ({ name }: { name: string }) => name.trim() === value.trim(),
    );
    return !value.length ? chats : usersBySearch;
  }

  public render() {
    return template;
  }
}

export default ChatUsers;
