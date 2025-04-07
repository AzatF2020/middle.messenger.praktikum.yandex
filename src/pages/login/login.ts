import { Component } from '@core/index';
import AuthController from '@controllers/AuthController';
import template from './template.hbs?raw';

class LoginPage extends Component {
  public componentDidMount() {
    new AuthController().redirectUser();
  }

  public render() {
    return template;
  }
}

export default LoginPage;
