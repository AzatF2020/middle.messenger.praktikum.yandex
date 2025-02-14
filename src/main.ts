import './styles/style.scss';
import { render, registerComponent } from '@core/index';
import components from '@components/index';
import modules from '@modules/index';

import LoginPage from '@pages/login/login';
import RegisterPage from '@pages/register/register';
import NotFound from '@pages/notFound/notFound';
import Chats from '@pages/chats/chats';

Object.entries(Object.assign(components, modules)).forEach(([componentName, componentInstance]) => {
    registerComponent(componentName, componentInstance)
})

render(new Chats)
