import Component from '@core/Component';
import template from './template.hbs?raw';
import './style.scss';

class AsideBackNavigation extends Component {
  constructor() {
    super();

    this.listeners = { click: () => { window.history.back(); } };
  }

  public render() {
    return template;
  }
}

export default AsideBackNavigation;
