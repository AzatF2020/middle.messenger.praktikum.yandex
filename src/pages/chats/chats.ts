import Component from '@core/Component';
import AuthController from '@controllers/AuthController';
import template from './template.hbs?raw';
import './style.scss';

class Chats extends Component {
  public async componentBeforeMount() {
    await new AuthController().redirectUser();
  }

  public render() {
    return template;
  }
}

export default Chats;
