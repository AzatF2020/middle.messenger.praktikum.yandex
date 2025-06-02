import WS_EVENTS from '@utils/constants/wsEvents';

type SocketURLArgs = {
  userId: number;
  chatId: number;
  token: string;
}

class WSTransport {
  static __instance: WSTransport;

  private _ping!: ReturnType<typeof setInterval>;

  private _wss!: WebSocket;

  private _connectingTimeout!: null | ReturnType<typeof setTimeout>;

  public url!: string;

  constructor(url: string = '') {
    if (WSTransport.__instance) {
      return WSTransport.__instance;
    }

    this.url = url;

    this._handleOpen = this._handleOpen.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleMessages = this._handleMessages.bind(this);
    this._handleError = this._handleError.bind(this);

    WSTransport.__instance = this;
  }

  private _addEventListeners() {
    this._wss!.addEventListener(WS_EVENTS.OPEN, this._handleOpen);
    this._wss!.addEventListener(WS_EVENTS.CLOSE, this._handleClose);
    this._wss!.addEventListener(WS_EVENTS.MESSAGE, this._handleMessages);
    this._wss!.addEventListener(WS_EVENTS.ERROR, this._handleError);
  }

  private _removeEventListeners() {
    if (!this._wss) return;

    this._wss!.removeEventListener(WS_EVENTS.OPEN, this._handleOpen);
    this._wss!.removeEventListener(WS_EVENTS.CLOSE, this._handleClose);
    this._wss!.removeEventListener(WS_EVENTS.MESSAGE, this._handleMessages);
    this._wss!.removeEventListener(WS_EVENTS.ERROR, this._handleError);
  }

  private _getOldMessages() {
    this._wss.send(JSON.stringify({
      type: 'get old',
      content: 0,
    }));
  }

  private _handleOpen() {
    console.info('[open] Соединение установлено');
    this._getOldMessages();

    this._ping = setInterval(() => {
      this._wss.send(JSON.stringify({
        type: 'ping',
      }));
    }, 5000);
  }

  private _handleClose(event: CloseEvent) {
    console.info(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);

    this.leave();
  }

  private _setUserInEveryMessage(messages: unknown[]): unknown[] {
    const result = (messages as Record<string, string | number>[]).map((item) => ({
      ...item,
      user: {
        ...((window.store.getState().selectedChat as { members: Array<{ id: number }> }).members
          .find(({ id }: { id: number}) => id === item.user_id)),
      },
    }));

    return result;
  }

  private _updateUserChatsInMenu(
    messages: { user: object; time: string | number; content: string }[],
  ): { id: number; lastMessage: { user: object; time: string | number; content: string }; [key: string]: unknown }[] | undefined {
    const userChats = (window.store.getState()?.userChats ?? []) as
    { id: number;
      lastMessage: { user: object; time: string | number; content: string };
      [key: string]: unknown
    }[];

    if (!userChats.length) return undefined;

    const lastMessage = messages[messages.length - 1];

    const selectedChat = userChats.find(({ id }: { id: number }) => id === window.store.getState().chatId);

    if (!selectedChat) return userChats;

    const formattedLastMessage = structuredClone({
      ...selectedChat,
      last_message: {
        ...selectedChat.lastMessage,
        user: { ...lastMessage.user },
        time: lastMessage.time,
        content: lastMessage.content,
      },
    }) as { id: number; lastMessage: { user: object; time: string | number; content: string }; [key: string]: unknown };

    return userChats.reduce((acc: {
        id: number;
        lastMessage: { user: object; time: string | number; content: string };
        [key: string]: unknown }[], item: { id: number; lastMessage: { user: object; time: string | number; content: string };
        [key: string]: unknown }) => {
      acc.push(formattedLastMessage.id === item.id ? formattedLastMessage : item);
      return acc;
    }, []);
  }

  private _handleMessages(event: MessageEvent) {
    const messages = JSON.parse(event.data);

    if (messages?.type === 'pong') return;

    if (Array.isArray(messages)) {
      window.store.setState({ messages: this._setUserInEveryMessage(messages) });
    } else if (messages?.type === 'message' || messages?.type === 'file') {
      const messagesWithUsers = this._setUserInEveryMessage([messages, ...(window.store.getState().messages as unknown[])]);

      window.store.setState({
        messages: messagesWithUsers,
        userChats: this._updateUserChatsInMenu(messagesWithUsers as { user: object; time: string | number; content: string }[]),
      });
    }
  }

  private _handleError(event: unknown) {
    console.info(`[error]: ${JSON.stringify(event)}`);
  }

  private generateSocketURL({
    userId,
    chatId,
    token,
  }: SocketURLArgs) {
    return `${this.url}/${userId}/${chatId}/${token}`;
  }

  private _waitForSocketConnection(callback: () => void, interval = 1000) {
    if (this._wss?.readyState === 1) {
      callback();
    } else {
      this._connectingTimeout = setTimeout(() => {
        this._waitForSocketConnection(callback, interval);
      }, interval);
    }
  }

  public leave() {
    window.store.setState({ messages: [] });
    clearInterval(this._ping);
    clearTimeout(this._connectingTimeout!);
    this._removeEventListeners();
  }

  public connectToSocket({ userId, chatId, token }: SocketURLArgs) {
    this._wss = new WebSocket(this.generateSocketURL({
      userId,
      chatId,
      token,
    }));

    this._addEventListeners();
  }

  public send<T>({ type = 'message', content }: { type?: string, content: T }) {
    if (!this._wss) return;

    this._waitForSocketConnection(() => {
      this._wss.send(JSON.stringify({
        type,
        content,
      }));
    });
  }
}

export default WSTransport;
