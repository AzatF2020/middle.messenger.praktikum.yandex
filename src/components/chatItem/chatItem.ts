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
}

class ChatItem extends Component {
  constructor(props: ChatItemProps) {
    super(props);

    this.state = {
      formattedTime: formatTime(this.props.time),
    };
  }

  public render() {
    return template;
  }
}

export default ChatItem;

// {
//   "id": 10,
//   "user_id": 3778,
//   "chat_id": 56331,
//   "type": "message",
//   "time": "2025-04-03T19:21:44+00:00",
//   "content": "Привет! Я бот, который отвечает на ваши сообщения. Если вы хотите удалить чат, то просто нажмите на кнопку \"Удалить чат\".",
//   "is_read": true,
//   "file": null
// }
