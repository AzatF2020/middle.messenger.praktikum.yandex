import Component from "@core/Component";
import './style.scss';

class RegisterForm extends Component {
    state = {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
    };

    listeners = {
        handleChangeInput: this.handleChangeInput.bind(this),
        onSubmit: this.onSubmit.bind(this)
    };

    handleChangeInput(event: Event) {
        const { name, value } = event.target as HTMLInputElement;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    onSubmit(event: Event) {
        event.preventDefault()
    }

    public render() {
        return `
            <form class="register-form" action="/" novalidate method="POST">
                <h1 class="heading-6 register-form__title">Регистрация</h1>

                <fieldset class="register-form__group">
                    <div class="input-floating">
                        {{{ Input value=email onChange=handleChangeInput type="email" id="email" name="email" placeholder="Почта" }}}
                        <label for="email" class="label">Почта</label>
                    </div>
                    <div class="input-floating">
                        {{{ Input type="text" value=login onChange=handleChangeInput id="login" name="login" placeholder="Логин" }}}
                        <label for="login" class="label">Логин</label>
                    </div>
                    <div class="input-floating">
                        {{{ Input type="text" value=first_name onChange=handleChangeInput id="first_name" name="first_name" placeholder="Имя" }}}
                        <label for="first_name" class="label">Имя</label>
                    </div>
                    <div class="input-floating">
                        {{{ Input type="text" value=second_name onChange=handleChangeInput id="second_name" name="second_name" placeholder="Фамилия" }}}
                        <label for="second_name" class="label">Фамилия</label>
                    </div>
                    <div class="input-group">
                        <div class="input-floating">
                            {{{ Input type="phone" value=phone id="phone" name="phone" placeholder="Телефон" onChange=handleChangeInput }}}
                            <label for="phone" class="label">Телефон</label>
                        </div>
                        <div class="error-feedback">
                            Обязательное поле.
                        </div>
                    </div>

                    <div class="input-group">
                        <div class="input-floating">
                            {{{ Input type="password" value=password id="password" name="password" placeholder="Пароль" onChange=handleChangeInput }}}
                            <label for="password" class="label">Пароль</label>
                        </div>
                        <div class="error-feedback">
                            Обязательное поле.
                        </div>
                    </div>
                </fieldset>

                <div class="register-form__bottom">
                    {{{ Button class="register-form__bottom-button" type="submit" label="Зарегистрироваться" onClick=onSubmit }}}
                    <a href="/#" class="link">Войти</a>
                </div>
            </form>
        `
    }
}

export default RegisterForm;
