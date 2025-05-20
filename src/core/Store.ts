import tick from '@utils/helpers/tick';
import deepMergeObjects from '@utils/helpers/mergeObjects';
import EventBus from './EventBus';

enum STORE_EVENTS {
  UPDATED = 'UPDATED'
}

class Store extends EventBus {
  static __instance__: Store;

  constructor(defaultState: any) {
    if (Store.__instance__) {
      return Store.__instance__;
    }
    super();

    this.state = defaultState;

    /*
      Вызов обновления состояния при инициализации Store в main.ts
      и последующих вызовов событий STORE_EVENTS.UPDATED в connectStore.
      connectStore (on) -> Store (emit) -> render (CBM/componentBeforeMount)
    */

    tick(() => {
      if (STORE_EVENTS.UPDATED in this.getListeners()) {
        this.setState(defaultState);
      }
    });

    Store.__instance__ = this;
  }

  private state: Record<string, any> = {};

  private makeStateProxy<T>(obj: Record<string, T | unknown>) {
    return new Proxy(obj, {
      get(target: Record<string, unknown>, value, receiver) {
        return Reflect.get(target, value, receiver);
      },
      set(target, oldValue, newValue, receiver) {
        if (newValue || newValue !== oldValue) {
          throw new Error('Запись запрещена');
        }
        return Reflect.set(target, oldValue, newValue, receiver);
      },
    });
  }

  public getState() {
    return this.makeStateProxy(this.state);
  }

  public setState<S = unknown>(value: S) {
    const prevState = structuredClone(this.state);

    this.state = deepMergeObjects(this.state, value);

    this.emit(STORE_EVENTS.UPDATED, prevState, this.makeStateProxy(this.state));
  }
}

export { STORE_EVENTS };

export default Store;
