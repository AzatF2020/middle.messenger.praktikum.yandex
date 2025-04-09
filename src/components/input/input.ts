import Component from '@core/Component';
import template from './template.hbs?raw';

interface InputProps {
  onChange?: () => void;
  onBlur?: () => void;
  onInput?: () => void;
  onKeydown?: () => void;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  class?: string;
  id?: string;
  type?: string;
  readonly?: boolean;
  required?: boolean;
}

class Input extends Component {
  constructor(props: InputProps) {
    super(props);

    this.listeners = {
      change: this.props.onChange,
      input: this.props.onInput,
      blur: this.props.onBlur,
      keydown: this.props.onKeydown,
    };
  }

  public render() {
    return template;
  }
}

export default Input;
