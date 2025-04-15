import { Component, connectStore } from '@core/index';
import tick from '@utils/helpers/tick';
import template from './template.hbs?raw';
import './style.scss';

type ChatMessagesListProps = {
  messages: Array<{
    id: number;
    user_id: number;
    chat_id: number;
    type: string;
    time: string;
    content: string;
    is_read: boolean;
    file: null
    user: Record<string, any>
  }>;
}

class ChatMessagesList extends Component {
  public timeout: NodeJS.Timeout | null;

  constructor(props: ChatMessagesListProps) {
    super(props);

    this.listeners = {
      openModalImage: this.openModalImage.bind(this),
      closeModalImage: this.closeModalImage.bind(this),
    };

    this.timeout = null;

    this.state = {
      modalImageOpened: false,
      imgSource: null,
    };
  }

  public componentDidUpdate(): void {
    // # Костыль, сохранять позицию скролла
    setTimeout(() => {
      document.querySelector('.chat-messages-list')?.scrollTo(0, window.store.getState().messagesListScrollTopPosition);
    }, 1);

    const scrollTop = document.querySelector('.chat-messages-list')?.scrollTop;

    if (!scrollTop) return;

    window.store.setState({ messagesListScrollTopPosition: scrollTop });
  }

  public componentWillUnmount(): void {
    clearTimeout(this.timeout!);
  }

  public openModalImage(event: Event) {
    const imgSource = (event.currentTarget as HTMLButtonElement).querySelector('img')!.src;
    this.setState({ ...this.state, modalImageOpened: true, imgSource });
  }

  public closeModalImage() {
    this.setState({ ...this.state, modalImageOpened: false, imgSource: null });
  }

  public render() {
    return template;
  }
}

export default connectStore(ChatMessagesList, (state) => ({
  myId: state.user?.id,
}));
