import WS_EVENTS from '@utils/constants/wsEvents';

type SocketURLArgs = {
  userId: number;
  chatId: number;
  token: string;
}

class WSTransport {
  static __instance: WSTransport;

  private _ping!: any;

  private _chatId!: string | number;

  private _wss!: WebSocket;

  private _connectingTimeout!: null | NodeJS.Timeout;

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

  private _leave() {
    window.store.setState({ messages: [] });
    clearInterval(this._ping);
    clearTimeout(this._connectingTimeout!);
    this._removeEventListeners();
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

    this._leave();
  }

  private _handleMessages(event: MessageEvent) {
    const messages = JSON.parse(event.data);

    if (messages?.type === 'pong') return;

    if (Array.isArray(messages)) {
      window.store.setState({ messages: structuredClone(messages).reverse() });
    } else if (messages?.type === 'message') {
      window.store.setState({
        messages: [...window.store.getState().messages, messages],
      });
    }
  }

  private _handleError(event: any) {
    console.log(`[error]: ${JSON.stringify(event)}`);
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

  public connectToSocket({ userId, chatId, token }: SocketURLArgs) {
    if (chatId !== this._chatId) {
      this._leave();

      this._chatId = chatId;

      this._wss = new WebSocket(this.generateSocketURL({
        userId,
        chatId,
        token,
      }));

      this._addEventListeners();
    }
  }

  public send<T>(content: T) {
    if (!this._wss) return;

    this._waitForSocketConnection(() => {
      this._wss.send(JSON.stringify({
        type: 'message',
        content,
      }));
    });
  }
}

export default WSTransport;
