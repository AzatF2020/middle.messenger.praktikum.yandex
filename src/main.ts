import './styles/style.scss';
import { render, registerComponent } from '@core/index';
import conditionalsHelper from '@utils/helpers/handlebarsHelpers';
import components from '@components/index';
import modules from '@modules/index';

import LoginPage from '@pages/login/login';
import RegisterPage from '@pages/register/register';
import NotFound from '@pages/notFound/notFound';
import Chats from '@pages/chats/chats';
import Profile from '@pages/profile/profile';

conditionalsHelper()

Object.entries(Object.assign(components, modules)).forEach(([componentName, componentInstance]) => {
    registerComponent(componentName, componentInstance)
})

render(new Profile)
