class EventBus {
  private _listeners: Record<string, Function[]> = {};

  private _isEventExist(event: string) {
    if (!this._listeners[event]) {
      throw new Error(`События ${event} не существует`);
    }
  }

  public on(event: string, callback: Function) {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }

    this._listeners[event].push(callback);
  }

  public off(event: string, callback: Function) {
    this._isEventExist(event);

    this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback);
  }

  public emit(event: string, ...args: any[]) {
    this._isEventExist(event);

    this._listeners[event].forEach((listener) => {
      listener(...args);
    });
  }

  public getListeners() {
    return this._listeners;
  }
}

export default EventBus;
