import Component from "@core/Component";
import './style.scss';

interface PopupProps {
    show: boolean
}

class Popup extends Component {
    constructor(props: PopupProps) {
        super(props)
    }

    public render() {
        return `
            <div class="popup ${this.props.show ? 'popup--active' : ''}"></div>
        `
    }
}

export default Popup;
