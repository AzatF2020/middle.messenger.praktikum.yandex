import Component from '@core/Component';
import template from './template.hbs?raw';
import './style.scss';

interface ButtonProps {
    onClick: () => void;
    label?: string;
    disabled?: boolean;
    class?: string;
    type?: 'button' | 'submit' | 'reset';
    title?: string;
    imgSource?: string;
}

class Button extends Component {
  constructor(props: ButtonProps) {
    super(props);
    this.listeners = { click: this.props.onClick };
  }

  public render() {
    return template;
  }
}

export default Button;
