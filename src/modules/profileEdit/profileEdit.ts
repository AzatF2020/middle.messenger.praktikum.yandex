import Component from "@core/Component";
import './style.scss';

class ProfileEdit extends Component {
    state = {
        email: 'pochta@yandex.ru',
        login: 'ivanivanov',
        first_name: 'Иван',
        second_name: 'Иванов',
        display_name: 'Иван',
        phone: '+7 (909) 967 30 30',
        avatar: '/img/plug.png',
    }

    listeners = {
        onSubmit: this.onSubmit.bind(this),
        setAvatarImg: this.setAvatarImg.bind(this),
        handleInputChange: this.handleInputChange.bind(this)
    };

    setAvatarImg(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0]

        if (!file) return;

        this.setState({ ...this.state, avatar: URL.createObjectURL(file) })
        console.log(this.state)
    }

    handleInputChange(event: Event) {
        const { name, value } = event.target as HTMLInputElement
        this.setState({ ...this.state, [name]: value })
    }

    onSubmit(event: Event) {
        event.preventDefault()
    }

    render() {
        return `
            <section class="profile-edit">
                {{{ AsideBackNavigation }}}
                <form class="container--centered profile-edit__form">
                    <fieldset class="profile-edit__form-header">
                        {{{ Avatar setImg=setAvatarImg imgSrc=avatar }}}
                        <h1 class="text-3 profile-edit__form-header-title">
                            Иван
                        </h1>
                    </fieldset>
                    <fieldset class="profile-edit__form-list-group">
                        <ul class="profile-edit__form-list">
                            <li class="profile-edit__form-item">
                                <label class="text-4 profile-edit__form-item-label" for="email">Почта</label>
                                {{{ Input
                                    onChange=handleInputChange
                                    value=email
                                    class="text-4 profile-edit__form-item-input"
                                    name="email"
                                    id="email"
                                    type="email"
                                }}}
                            </li>
                            <li class="profile-edit__form-item">
                                <label class="text-4 profile-edit__form-item-label" for="login">Логин</label>
                                {{{ Input
                                    onChange=handleInputChange
                                    value=login
                                    class="text-4 profile-edit__form-item-input"
                                    name="login"
                                    id="login"
                                }}}
                            </li>
                            <li class="profile-edit__form-item">
                                <label class="text-4 profile-edit__form-item-label" for="first_name">Имя</label>
                                {{{ Input
                                    onChange=handleInputChange
                                    value=first_name
                                    class="text-4 profile-edit__form-item-input"
                                    name="first_name"
                                    id="first_name"
                                }}}
                            </li>
                            <li class="profile-edit__form-item">
                                <label class="text-4 profile-edit__form-item-label" for="second_name">Фамилия</label>
                                {{{ Input
                                    onChange=handleInputChange
                                    value=second_name
                                    class="text-4 profile-edit__form-item-input"
                                    name="second_name"
                                    id="second_name"
                                }}}
                            </li>
                            <li class="profile-edit__form-item">
                                <label class="text-4 profile-edit__form-item-label" for="display_name">Имя в чате</label>
                                {{{ Input
                                    onChange=handleInputChange
                                    value=display_name
                                    class="text-4 profile-edit__form-item-input"
                                    name="display_name"
                                    id="display_name"
                                }}}
                            </li>
                            <li class="profile-edit__form-item">
                                <label class="text-4 profile-edit__form-item-label" for="phone">Телефон</label>
                                {{{ Input
                                    onChange=handleInputChange
                                    value=phone
                                    class="text-4 profile-edit__form-item-input"
                                    name="phone"
                                    id="phone"
                                    type="phone"
                                }}}
                            </li>
                        </ul>
                    </fieldset>
                    {{{ Button
                        class="button button-primary profile-edit__form-item-button"
                        label="Сохранить"
                        type="submit"
                        onClick=onSubmit
                    }}}
                </form>
            </section>
        `
    }
}

export default ProfileEdit;
