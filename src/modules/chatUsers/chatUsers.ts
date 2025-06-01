import { Component, connectStore } from '@core/index';
import ChatsController from '@controllers/ChatsController';
import UsersController from '@controllers/UsersController';
import { PATHNAMES } from '@utils/constants/pagesPathnames';
import template from './template.hbs?raw';
import './style.scss';

interface IChatUsers {
  handleInputChange: (event: Event) => void;
}

class ChatUsers extends Component implements IChatUsers {
  public chatsController: ChatsController;

  public usersController: UsersController;

  constructor(props?: Record<string, unknown>) {
    super(props);

    this.chatsController = new ChatsController();
    this.usersController = new UsersController();

    this.listeners = {
      handleInputChange: this.handleInputChange.bind(this),
      goToProfile: () => { window.router.go(PATHNAMES.PROFILE); },
    };

    this.state = {
      searchLoading: false,
    };
  }

  public async componentDidMount() {
    await this.chatsController.getChats();
  }

  public async handleInputChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    try {
      this.setState({ searchLoading: true });
      await this.usersController.searchUser({ login: value });
    } finally {
      this.setState({ searchLoading: false });
    }

    window.store.setState({ [name]: value });
  }

  public render() {
    return template;
  }
}

export default connectStore(ChatUsers, (state) => ({
  userChats: state.userChats,
  searchedUserChats: state.searchedUserChats,
  search: state.search,
}));
