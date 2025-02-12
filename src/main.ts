import './styles/style.scss';
import { render, registerComponent } from './core';
import components from './components';
import LoginPage from './pages/login/login';

Object.entries(components).forEach(([componentName, componentInstance]) => {
    registerComponent(componentName, componentInstance)
})

render(new LoginPage)
