import { Component, connectStore } from '@core/index';
import template from './template.hbs?raw';
import './style.scss';

type LoaderOverlayProps = {
  loading?: boolean;
}

class GlobalLoader extends Component {
  constructor(props: LoaderOverlayProps) {
    super(props);
  }

  public render() {
    return template;
  }
}

export default connectStore(GlobalLoader, (state) => ({
  loading: state.loading,
}));
