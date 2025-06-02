import { Component } from '@core/index';
import template from './template.hbs?raw';
import './style.scss';

type LoaderOverlayProps = {
  loading?: boolean;
}

class LoaderOverlay extends Component {
  constructor(props: LoaderOverlayProps) {
    super(props);
  }

  public render() {
    return template;
  }
}

export default LoaderOverlay;
