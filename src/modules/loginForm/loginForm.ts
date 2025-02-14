import { Component } from "@core/index";
import './style.scss';

class LoginForm extends Component {
    public state = {
        login: '',
        password: ''
    }

    public listeners = {
        handleInputChange: this.handleInputChange.bind(this),
        onSubmit: this.onSubmit.bind(this)
    };

    public handleInputChange(event: Event) {
        const { name, value } = event.target as HTMLInputElement

        this.setState({ ...this.state, [name]: value })
    }

    onSubmit(event: Event) {
        event.preventDefault()
    }

    public render() {
        return `
            <form class="login-form" action="/" novalidate method="POST">
                <h1 class="heading-6 login-form__title">Вход</h1>

                <fieldset class="login-form__group">
                    <div class="input-floating">
                        {{{ Input value=login onChange=handleInputChange type="text" id="login" name="login" placeholder="Логин" }}}
                        <label for="login" class="label">Логин</label>
                    </div>
                    <div class="input-floating">
                        {{{ Input value=password onChange=handleInputChange type="password" id="password" name="password" placeholder="Пароль" }}}
                        <label for="password" class="label">Пароль</label>
                    </div>
                </fieldset>

                <div class="login-form__bottom">
                    {{{ Button onClick=onSubmit class="login-form__bottom-button" type="submit" label="Авторизоваться" }}}
                    <a href="/#" class="link">Нет аккаунта?</a>
                </div>
            </form>
        `
    }
}

export default LoginForm;
