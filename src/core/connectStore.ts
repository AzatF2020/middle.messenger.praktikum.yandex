import { default as Block } from './Component';
import { STORE_EVENTS } from './Store';

function connectStore<T>(Component: typeof Block) {
  return class extends Component {
    constructor(props: T) {
      super(props);

      window.store.on(STORE_EVENTS.UPDATED, () => {
        console.log('work');
        this.setState({ ...this.state, ...window.store.getState() });
      });
    }
  };
}

export default connectStore;
