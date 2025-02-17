import Component from "@core/Component";
import './style.scss';

class ProfileNewPassword extends Component {
    state = {
        oldPassword: 'SamplePass321',
        newPassword: 'SamplePass321'
    }

    listeners = {
        onSubmit: this.onSubmit.bind(this),
        handleChangeInput: this.handleChangeInput.bind(this)
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

    render() {
        return `
           <section class="profile-new-password">
                {{{ AsideBackNavigation }}}
                <form class="container--centered profile-new-password__form">
                {{{ oldPassword }}} {{{ newPassword }}}
                    <fieldset class="profile-new-password__form-header">
                        {{{ Avatar readonly=true }}}
                    </fieldset>
                    <fieldset class="profile-new-password__form-list-group">
                        <ul class="profile-new-password__form-list">
                            <li class="profile-new-password__form-item">
                                <label class="text-4 profile-new-password__form-item-label" for="oldPassword">Старый пароль</label>
                                {{{ Input
                                    onChange=handleChangeInput
                                    class="text-4 profile-new-password__form-item-input"
                                    name="oldPassword"
                                    value=oldPassword
                                    id="oldPassword"
                                    type="password"
                                }}}
                            </li>
                            <li class="profile-new-password__form-item">
                                <label class="text-4 profile-new-password__form-item-label" for="newPassword">Новый пароль</label>
                                {{{ Input
                                    onChange=handleChangeInput
                                    class="text-4 profile-new-password__form-item-input"
                                    name="newPassword"
                                    value=newPassword
                                    id="newPassword"
                                    type="password"
                                }}}
                            </li>
                        </ul>
                    </fieldset>
                    {{{ Button onClick=onSubmit class="button profile-new-password__form-item-button" type="submit" label="Сохранить" }}}
                </form>
            </section>
        `
    }
}

export default ProfileNewPassword;
