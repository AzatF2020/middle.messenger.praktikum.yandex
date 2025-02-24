import Component from "@core/Component";
import template from "./template.hbs?raw";
import "./style.scss";

interface ChatMessages {
    openAddUserModal(): void;
    closeAddUserModal(): void;
    openDeleteUserModal(): void;
    closeDeleteUserModal(): void;
    handleInputChange(event: Event): void;
    onSubmit(event: Event): void;
}

class ChatMessages extends Component implements ChatMessages {
    constructor() {
        super();

        this.state = {
            message: "",
            disabledSendButton: true,
            modalAddUserOpened: false,
            modalDeleteUserOpened: false,
        };

        this.listeners = {
            openAddUserModal: this.openAddUserModal.bind(this),
            closeAddUserModal: this.closeAddUserModal.bind(this),
            openDeleteUserModal: this.openDeleteUserModal.bind(this),
            closeDeleteUserModal: this.closeDeleteUserModal.bind(this),
            handleInputChange: this.handleInputChange.bind(this),
            onSubmit: this.onSubmit.bind(this),
        };
    }

    public openAddUserModal() {
        this.setState({ ...this.state, modalAddUserOpened: true });
    }

    public closeAddUserModal() {
        this.setState({ ...this.state, modalAddUserOpened: false });
    }

    public openDeleteUserModal() {
        this.setState({ ...this.state, modalDeleteUserOpened: true });
    }

    public closeDeleteUserModal() {
        this.setState({ ...this.state, modalDeleteUserOpened: false });
    }

    public handleInputChange(event: Event) {
        const { name, value } = event.target as HTMLInputElement;

        this.setState({
            ...this.state,
            disabledSendButton: !value.trim().length,
            [name]: value,
        });
    }

    public onSubmit(event: Event) {
        event.preventDefault();
    }

    public render() {
        return template;
    }
}

export default ChatMessages;
