import Component from "@core/Component";
import chats from "@utils/pages-data/chats";
import template from "./template.hbs?raw";
import "./style.scss";

interface IChatUsers {
    searchUsers: (value: string) => void;
    handleInputChange: (event: Event) => void;
}

class ChatUsers extends Component implements IChatUsers {
    constructor() {
        super();

        this.state = { data: chats, message: "" };
        this.listeners = {
            handleInputChange: this.handleInputChange.bind(this),
        };
    }

    public searchUsers(value: string) {
        const usersBySearch = chats.filter(
            ({ name }: { name: string }) => name.trim() === value.trim()
        );
        return !value.length ? chats : usersBySearch;
    }

    public handleInputChange(event: Event) {
        const { name, value } = event.target as HTMLInputElement;

        this.setState({
            data: this.searchUsers(value),
            [name]: value.trim(),
        });
    }

    public render() {
        return template;
    }
}

export default ChatUsers;
