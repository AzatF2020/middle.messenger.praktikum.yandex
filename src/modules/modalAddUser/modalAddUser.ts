import Component from "@core/Component";
import './style.scss';

interface ModalAddUserProps {
    handleCloseModal: () => void;
    isActive: boolean;
}

class ModalAddUser extends Component {
    constructor(props: ModalAddUserProps) {
        super(props);

        this.state = { login: '' }

        this.listeners = {
            click: this.closeByOverlay.bind(this),
            handleInputChange: this.handleInputChange.bind(this)
        }
    }

    closeByOverlay(event: Event) {
        const modalInner = document.querySelector('.user-add-modal__inner') as HTMLElement;

        if (!modalInner.contains((event.target as HTMLElement))) {
            this.props.handleCloseModal();
        }
    }

    handleInputChange(event: Event) {
        const { name, value } = event.target as HTMLInputElement;

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    render() {
        return `
            <div class="modal user-add-modal {{#if isActive}} modal--active {{/if}} id="modal-add-user">
                <div class="user-add-modal__inner modal__wrapper">
                    {{{ Button onClick=handleCloseModal imgSource="/icons/close.svg" class="modal__close-button" title="Закрыть" }}}

                    <form class="user-add-modal__form">
                        <h1 class="heading-6 user-add-modal__title">Добавить пользователя</h1>

                        <fieldset class="user-add-modal__group">
                            <div class="input-floating">
                                {{{ Input id="login" name="login" value=login onChange=handleInputChange placeholder="Логин" }}}
                                <label for="login" class="label">Логин</label>
                            </div>
                        </fieldset>

                        {{{ Button class="button button-primary user-add-modal__button" type="submit" label="Добавить" }}}
                    </form>
                </div>
            </div>
        `
    }
}

export default ModalAddUser;
