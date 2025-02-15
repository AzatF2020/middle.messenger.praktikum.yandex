import Component from "@core/Component";
import './style.scss';

class ModalAddUser extends Component {
    constructor(props) {
        super(props);

        this.listeners = {
            handleCloseModal: this.handleCloseModal.bind(this)
        }
    }

    handleCloseModal(event: Event) {
        (event.currentTarget as HTMLButtonElement).closest('dialog')!.close()
    }

    render() {
        return `
            <dialog class="modal" id="modal-add-user">
                <div class="modal__wrapper">
                    {{{ Button onClick=handleCloseModal imgSource="/icons/close.svg" class="modal__close-button" title="Прикрепить" }}}

                    <form action="/" novalidate method="post" class="user-modal">
                        <h1 class="text-3 user-modal__title">Добавить пользователя</h1>

                        <fieldset class="user-modal__group">
                            <div class="input-floating">
                                <input type="text" id="login" name="login" placeholder="Логин" class="input" />
                                <label for="login" class="label">Логин</label>
                            </div>
                        </fieldset>

                        <button class="button button-primary user-modal__button" type="submit">Добавить</button>
                    </form>
                </div>
            </dialog>
        `
    }
}

export default ModalAddUser;
