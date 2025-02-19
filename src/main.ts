import './styles/style.scss';
import { render, registerComponent, Component } from '@core/index';
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
import Index from '@pages/index/index';
import ServerError from '@pages/serverError/serverError';

const pages: Record<string, typeof Component> = {
    'login': LoginPage,
    'register': RegisterPage,
    'chats': Chats,
    'profile': Profile,
    'profile-change-data': ProfileEdit,
    'profile-new-password': ProfileNewPassword,
    'not-found': NotFound,
    'server-error': ServerError
}

conditionalsHelper()

Object.entries(Object.assign(components, modules)).forEach(([componentName, componentInstance]) => {
    registerComponent(componentName, componentInstance as typeof Component)
})

document.addEventListener('DOMContentLoaded', () => {
    const componentByLocation = pages[window.location.pathname.slice(1)]

    !componentByLocation ? render(new Index) : render(new componentByLocation)
})
