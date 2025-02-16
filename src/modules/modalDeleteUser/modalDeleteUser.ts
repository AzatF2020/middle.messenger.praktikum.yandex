import Component from "@core/Component";
import './style.scss';

interface ModalDeleteUserProps {
    handleCloseModal: () => void;
    isActive: boolean;
}

class ModalDeleteUser extends Component {
    constructor(props: ModalDeleteUserProps) {
        super(props);

        this.state = { login: '' }

        this.listeners = {
            click: this.closeByOverlay.bind(this),
            handleInputChange: this.handleInputChange.bind(this)
        }
    }

    closeByOverlay(event: Event) {
        const modalInner = document.querySelector('.user-delete-modal__inner') as HTMLElement;

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
            <div class="modal {{#if isActive}} modal--active {{/if}}" id="modal-delete-user">
                {{ isActive }}
                <div class="modal__wrapper user-delete-modal__inner">
                    {{{ Button onClick=handleCloseModal imgSource="/icons/close.svg" class="modal__close-button" title="Закрыть" }}}

                    <h1 class="heading-6 user-delete-modal__title">Удалить пользователя</h1>

                    <p class="text-4 user-delete-modal__text">
                        Вы уверены, что хотите удалить пользователя?
                    </p>

                    <div class="user-delete-modal__footer">
                        {{{ Button class="button" onClick=handleCloseModal label="Отменить" }}}
                        {{{ Button class="button user-delete-modal__button" label="Удалить" }}}
                    </div>
                </div>
            </div>
        `
    }
}

export default ModalDeleteUser;
