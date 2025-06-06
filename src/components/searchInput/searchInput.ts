import Component from '@core/Component';
import template from './template.hbs?raw';

type SearchInputProps = {
  onChange(event: Event): void;
  value: HTMLInputElement['value'];
  loading: boolean;
  placeholder?: string;
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
