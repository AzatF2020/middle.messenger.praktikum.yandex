import { Component, connectStore } from '@core/index';
import template from './template.hbs?raw';
import './style.scss';

type LoaderOverlayProps = {
  loading?: boolean;
  [key: string]: unknown;
}

class LoaderOverlay extends Component {
  constructor(props: LoaderOverlayProps) {
    super(props);
  }

  public render() {
    return template;
  }
}

export default connectStore(LoaderOverlay, (state) => ({ loading: state.loading }));
