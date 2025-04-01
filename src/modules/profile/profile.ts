import { Component } from '@core/index';
import ProfileController from '@controllers/ProfileController';
import template from './template.hbs?raw';
import './style.scss';

class Profile extends Component {
  constructor() {
    super();

    const profileController = new ProfileController();

    this.listeners = {
      goBack: () => { window.router.back(); },
      logout: () => { profileController.logout(); },
    };
  }

  public render() {
    return template;
  }
}

export default Profile;
