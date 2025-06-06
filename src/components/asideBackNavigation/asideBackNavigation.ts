import Component from '@core/Component';
import template from './template.hbs?raw';
import './style.scss';

class AsideBackNavigation extends Component {
  constructor(props?: Record<string, unknown>) {
    super(props);

    this.listeners = { click: () => { window.history.back(); } };
  }

  public render() {
    return template;
  }
}

export default AsideBackNavigation;
