import { Component, HTTPClient } from '@core/index';
import template from './template.hbs?raw';

class RegisterPage extends Component {
  public httpClient = new HTTPClient();

  public render() {
    return template;
  }
}

export default RegisterPage;
