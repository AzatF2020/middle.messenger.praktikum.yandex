import Component from "@core/Component";
import template from "./template.hbs?raw";
import "./style.scss";

interface IModalDeleteUser {
    closeByOverlay: (event: Event) => void;
    handleInputChange: (event: Event) => void;
}

type ModalDeleteUserProps = {
    handleCloseModal: (event: Event) => void;
    isActive: boolean;
};

class ModalDeleteUser extends Component implements IModalDeleteUser {
    constructor(props: ModalDeleteUserProps) {
        super(props);

        this.state = { login: "" };

        this.listeners = {
            click: this.closeByOverlay.bind(this),
            handleInputChange: this.handleInputChange.bind(this),
        };
    }

    public closeByOverlay(event: Event) {
        const modalInner = document.querySelector(
            ".user-delete-modal__inner"
        ) as HTMLElement;

        if (!modalInner.contains(event.target as HTMLElement)) {
            this.props.handleCloseModal(event);
        }
    }

    public handleInputChange(event: Event) {
        const { name, value } = event.target as HTMLInputElement;

        this.setState({
            ...this.state,
            [name]: value,
        });
    }

    public render() {
        return template;
    }
}

export default ModalDeleteUser;
