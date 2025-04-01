import { default as Block } from './Component';
import { STORE_EVENTS } from './Store';

function connectStore<T extends Record<string, unknown>>(
  Component: typeof Block,
  mapStateProps: (storeState: any) => any = () => {},
) {
  return class extends Component {
    private onChangeStore: () => void;

    constructor(props: T) {
      const store = window?.store;
      let storeState = mapStateProps(store.getState());

      super({ ...props, ...storeState });

      this.onChangeStore = () => {
        const newStoreState = mapStateProps(store.getState());

        if (JSON.stringify(newStoreState) !== JSON.stringify(storeState)) {
          this.setState({ ...this.state, ...newStoreState });
        }

        storeState = newStoreState;
      };

      store.on(STORE_EVENTS.UPDATED, this.onChangeStore);
    }

    public componentWillUnmount(): void {
      // Удалять при переключении страницы
      // window.store.off(STORE_EVENTS.UPDATED, this.onChangeStore);
    }
  };
}

export default connectStore;
