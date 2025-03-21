import { Router, Component } from '@core/index';
import template from './template.hbs?raw';
import './style.scss';

class Profile extends Component {
  constructor() {
    super();

    const router = new Router();
    this.listeners = { goBack: () => { router.back(); } };
  }

  public render() {
    return template;
  }
}

export default Profile;
