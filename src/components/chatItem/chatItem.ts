import { Component } from '@core/index';
import formatTime from '@utils/helpers/formatTime';
import template from './template.hbs?raw';
import './style.scss';

type ChatItemProps = {
  openModalImage(event: Event): void
  time: string;
  content: string;
  myId: number;
  user_id: number;
  chat_id: number;
  is_read: boolean;
  login: string;
  display_name: string | null;
  file: Record<string, any>
}

class ChatItem extends Component {
  constructor(props: ChatItemProps) {
    super(props);

    this.state = {
      imgSource: `${import.meta.env.VITE_BACKEND_STORAGE}${this.props.file?.path}`,
      formattedTime: formatTime(this.props.time),
    };

    this.listeners = {
      openModalImage: this.props.openModalImage,
    };
  }

  public render() {
    return template;
  }
}

export default ChatItem;
