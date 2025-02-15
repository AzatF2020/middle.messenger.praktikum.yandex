import Component from "@core/Component";
import './style.scss';

class PopupOptions extends Component {
    constructor() {
        super();

        this.state = { show: false }
        this.listeners = {
            openModalUser: this.openModalUser.bind(this)
        }
    }

    togglePopup(event: Event) {
        const popupWrapper = document.querySelector('.popup-options');
        const button = popupWrapper!.querySelector('.popup-options__button-more');

        if (this.state.show && button?.contains((event.target as HTMLElement))) {
            this.setState({ ...this.state, show: false });
            return
        }

        this.setState({
            ...this.state,
            show: popupWrapper!.contains((event.target as HTMLElement))
        })
    }

    componentDidMount() {
        document.addEventListener('click', this.togglePopup.bind(this))
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.togglePopup.bind(this))
    }

    openModalUser(event: Event) {
        (document.getElementById('modal-add-user') as HTMLDialogElement)!.showModal()
    }

    render() {
        return `
            <div class="popup-wrapper popup-options">
                {{{ Button class="button popup-options__button-more" title="Опции" imgSource="/icons/more-icon.svg" }}}
                <ul class="popup {{#if show}} popup--active {{/if}} popup-options__list">
                    <li class="popup-item">
                        {{{ Button onClick=openModalUser class="text-5 popup-button" label="Добавить пользователя" imgSource="/icons/add.svg" }}}
                    </li>
                    <li class="popup-item">
                        {{{ Button class="text-5 popup-button" label="Удалить пользователя" imgSource="/icons/remove.svg" }}}
                    </li>
                </ul>
            </div>
        `
    }
}

export default PopupOptions;
