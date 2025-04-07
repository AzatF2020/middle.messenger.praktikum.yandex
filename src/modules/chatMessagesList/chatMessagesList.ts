import { Component, connectStore } from '@core/index';
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
  }>;
}

class ChatMessagesList extends Component {
  constructor(props: ChatMessagesListProps) {
    super(props);
  }

  public render() {
    return template;
  }
}

export default connectStore(ChatMessagesList, (state) => ({
  myId: state.user?.id,
}));
