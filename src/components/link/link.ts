import Component from '@core/Component';
import template from './template.hbs?raw';

type LinkProps = {
  class: string;
  label: string;
  onClick: () => void;
}

class Link extends Component {
  constructor(props: LinkProps) {
    super(props);
    this.listeners = { click: this.props.onClick };
  }

  public render() {
    return template;
  }
}

export default Link;
