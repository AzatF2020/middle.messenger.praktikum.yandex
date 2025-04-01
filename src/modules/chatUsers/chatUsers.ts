import { Component } from '@core/index';
import ChatsController from '@controllers/ChatsController';
import UsersController from '@controllers/UsersController';
import template from './template.hbs?raw';
import './style.scss';

interface IChatUsers {
  handleInputChange: (event: Event) => void;
}

class ChatUsers extends Component implements IChatUsers {
  public chatsController: ChatsController;

  public usersController: UsersController;

  constructor() {
    super();

    this.chatsController = new ChatsController();
    this.usersController = new UsersController();

    this.state = { data: [], message: '' };
    this.listeners = {
      handleInputChange: this.handleInputChange.bind(this),
      goToProfile: () => { window.router.go('/profile'); },
    };
  }

  public async componentDidMount() {
    const users = await this.chatsController.getChats();

    this.setState({ ...this.state, data: users });
  }

  public async handleInputChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    const data = await this.usersController.searchUser({ login: value });

    this.setState({ [name]: value, data });
  }

  public render() {
    return template;
  }
}

export default ChatUsers;
