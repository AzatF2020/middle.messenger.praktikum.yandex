import Component from '@core/Component';
import template from './template.hbs?raw';
import './style.scss';

type SearchInputProps = {
  onChange(event: Event): void;
  value: HTMLInputElement['value'];
  loading: boolean;
}

class SearchInput extends Component {
  constructor(props: SearchInputProps) {
    super(props);
  }

  public render() {
    return template;
  }
}

export default SearchInput;
