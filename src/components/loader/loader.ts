import { Component } from '@core/index';
import template from './template.hbs?raw';
import './style.scss';

type LoaderProps = {
  style?: string;
}

class Loader extends Component {
  constructor(props: LoaderProps) {
    super(props);
  }

  public render() {
    return template;
  }
}

export default Loader;
