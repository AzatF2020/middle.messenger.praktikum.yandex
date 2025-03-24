import './styles/style.scss';
import { Router, registerComponent } from '@core/index';
import conditionalsHelper from '@utils/helpers/handlebarsHelpers';
import components from '@components/index';
import modules from '@modules/index';

import LoginPage from '@pages/login/login';
import RegisterPage from '@pages/register/register';
import NotFound from '@pages/notFound/notFound';
import Chats from '@pages/chats/chats';
import Profile from '@pages/profile/profile';
import ProfileEdit from '@pages/profileEdit/profileEdit';
import ProfileNewPassword from '@pages/profileNewPassword/profileNewPassword';
import ServerError from '@pages/serverError/serverError';
import Index from '@pages/index/index';
import Store, { STORE_EVENTS } from '@core/Store';

conditionalsHelper();

Object.entries(Object.assign(components, modules)).forEach(
  ([componentName, componentInstance]) => {
    registerComponent(componentName, componentInstance);
  },
);

const router = new Router();

window.store = new Store({
  user: null,
  loginError: null,
  loading: false,
});

console.log(window.store._listeners);

router
  .use('/', LoginPage)
  .use('/sign-up', RegisterPage)
  .use('/pages', Index)
  .use('/messenger', Chats)
  .use('/profile', Profile)
  .use('/profile-new-password', ProfileNewPassword)
  .use('/profile-change-data', ProfileEdit)
  .use('/not-found', NotFound)
  .use('/server-error', ServerError)
  .start();
