import './styles/style.scss';
import { Router, registerComponent } from '@core/index';
import { PATHNAMES } from '@utils/constants/pagesPathnames';
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
import Store from '@core/Store';

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
  registerError: null,
  loading: false,
});

document.addEventListener('DOMContentLoaded', () => {
  router
    .use(PATHNAMES.LOGIN, LoginPage)
    .use(PATHNAMES.SIGN_UP, RegisterPage)
    .use('/pages', Index)
    .use(PATHNAMES.MESSENGER, Chats)
    .use(PATHNAMES.PROFILE, Profile)
    .use('/profile-new-password', ProfileNewPassword)
    .use('/profile-change-data', ProfileEdit)
    .use(PATHNAMES.NOT_FOUND, NotFound)
    .use(PATHNAMES.SERVER_ERROR, ServerError)
    .start();
});
