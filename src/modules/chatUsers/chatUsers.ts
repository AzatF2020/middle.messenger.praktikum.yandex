import Component from "@core/Component";
import chats from "@utils/pages-data/chats";
import './style.scss';

class ChatUsers extends Component {
    constructor() {
        super();

        this.state = { data: chats, message: '' }

        this.listeners = {
            handleInputChange: this.handleInputChange.bind(this)
        }
    }

    searchUsers(value: string) {
        const usersBySearch = chats.filter(({ name }: { name: string }) => name.trim() === value.trim())
        return !value.length ? chats : usersBySearch
    }

    handleInputChange(event: Event) {
        const { name, value } = event.target as HTMLInputElement;

        this.setState({
            data: this.searchUsers(value),
            [name]: value.trim()
        })
    }

    render() {
        return `
        <div class="aside">
            <header class="aside__header">
                <a class="link aside__profile-link" href="/#">
                    <span>Профиль</span>
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9L5 5L1 1" stroke="#999999"/>
                    </svg>
                </a>
                <div class="input-group">
                    <div class="input-group-text">
                        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.59239 8.41382C6.16047 9.84574 3.83886 9.84574 2.40694 8.41382C0.975017 6.9819 0.975017 4.6603 2.40694 3.22837C3.83886 1.79645 6.16047 1.79645 7.59239 3.22837C9.02431 4.6603 9.02431 6.9819 7.59239 8.41382ZM8.03277 9.79678C6.07255 11.2962 3.25696 11.1495 1.46413 9.35663C-0.488491 7.40401 -0.488491 4.23819 1.46413 2.28556C3.41675 0.332943 6.58258 0.332943 8.5352 2.28556C10.3279 4.07831 10.4747 6.89373 8.97555 8.85394L12.5423 12.4206L11.5994 13.3635L8.03277 9.79678Z" fill="#999999"/>
                        </svg>
                    </div>
                    {{{ Input value=message onChange=handleInputChange name="message" placeholder="Поиск" class="input-outlined aside__search" }}}
                </div>
            </header>
            <ul class="aside__chats">
                {{#each data}}
                <li class="aside__chat-user {{#if is_active }}aside__chat-user--active{{/if}}">
                    <div class="aside__chat-user-image-plug"></div>
                    <div class="aside__chat-user-info">
                        <div class="aside__chat-user-header">
                            <strong>
                                <a href="/#" class="aside__chat-user-name">
                                    {{ name }}
                                </a>
                            </strong>
                            <time class="aside__chat-user-time">
                                {{ time }}
                            </time>
                        </div>
                        {{#if message}}
                            <p class="text-5 aside__chat-user-message">
                                {{#if myself_sender}}
                                    <span class="aside__chat-user-message-sender">Вы:</span>
                                {{/if}}
                                {{ message }}
                            </p>
                        {{/if}}
                    </div>
                    {{#if unread_messages }}
                        <span class="aside__chat-user-unread-messages">
                            {{ unread_messages }}
                        </span>
                    {{/if}}
                </li>
                {{/each}}
            </ul>
        </div>
        `
    }
}

export default ChatUsers;
