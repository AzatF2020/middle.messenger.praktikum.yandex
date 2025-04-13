import { Component } from '@core/index';
import formatTime from '@utils/helpers/formatTime';
import template from './template.hbs?raw';
import './style.scss';

type ChatItemProps = {
  time: string;
  content: string;
  myId: number;
  user_id: number;
  chat_id: number;
  is_read: boolean;
  user: Record<string, any>
}

class ChatItem extends Component {
  constructor(props: ChatItemProps) {
    super(props);

    console.log(this.props);
    this.state = {
      storage: import.meta.env.VITE_BACKEND_STORAGE,
      formattedTime: formatTime(this.props.time),
    };
  }

  public render() {
    return template;
  }
}

export default ChatItem;
