import { default as Block } from './Component';
import Store, { STORE_EVENTS } from './Store';

function connectStore<T>(Component: typeof Block, mapStateProps: (storState: any) => any) {
  return class extends Component<T> {
    protected store: Store;

    constructor(props: T) {
      super(props);

      this.store = window?.store;

      this.store.on(STORE_EVENTS.UPDATED, this.onChangeStore.bind(this));
    }

    public componentWillUnmount(): void {
      console.log('work');
      this.store.off(STORE_EVENTS.UPDATED, this.onChangeStore.bind(this));
    }

    private onChangeStore(): void {
      this.setState({ ...this.state, ...mapStateProps(this.store.getState()) });
    }
  };
}

export default connectStore;
