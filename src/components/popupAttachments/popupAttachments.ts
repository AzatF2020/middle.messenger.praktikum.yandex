import Component from "@core/Component";
import './style.scss';

class PopupAttachments extends Component {
    state = { show: false }

    togglePopup(event: Event) {
        const popupWrapper = document.querySelector('.popup-attachments__button-attach-wrapper');
        const button = popupWrapper!.querySelector('.popup-attachments__button-attach');

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
        window.addEventListener('click', this.togglePopup.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.togglePopup.bind(this))
    }

    public render() {
        return `
            <div class="popup-wrapper popup-attachments__button-attach-wrapper">
                <ul class="popup {{#if show}} popup--active {{/if}} popup-attachments__attach-popup">
                    <li class="popup-item popup-attachments__attach-item">
                        {{{ Button class="text-5 popup-button popup-attachments__button-attach-item-button" label="Фото или Видео" imgSource="/icons/photo.svg" }}}
                    </li>
                    <li class="popup-item popup-attachments__attach-item">
                        {{{ Button class="text-5 popup-button popup-attachments__button-attach-item-button" label="Локация" imgSource="/icons/file.svg" }}}
                    </li>
                    <li class="popup-item popup-attachments__attach-item">
                        {{{ Button class="text-5 popup-button popup-attachments__button-attach-item-button" label="Локация" imgSource="/icons/location.svg" }}}
                    </li>
                </ul>
                {{{ Button imgSource="/icons/attach-icon.svg" class="button popup-attachments__button-attach" title="Прикрепить" }}}
            </div>
        `
    }
}

export default PopupAttachments;
