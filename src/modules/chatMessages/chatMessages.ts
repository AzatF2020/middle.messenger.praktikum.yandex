import Component from "@core/Component";
import './style.scss';

class ChatMessages extends Component {
    constructor(props: any) {
        super(props);

        this.state = { message: '', disabledSendButton: true }

        this.listeners = {
            handleInputChange: this.handleInputChange.bind(this),
            onSubmit: this.onSubmit.bind(this)
        }
    }

    handleInputChange(event: Event) {
        const { name, value } = event.target as HTMLInputElement;

        this.setState({
            ...this.state,
            disabledSendButton: !value.trim().length,
            [name]: value
        })
    }

    onSubmit(event: Event) {
        event.preventDefault();
        console.log(event);
    }

    public render() {
        return `
            <div class="chat">
                <div class="chat__user-header">
                    <div class="chat__user-header-left-column">
                        <div class="chat__user-header-plug"></div>
                        <a href="/#" target="_blank" rel="noopener noreferrer" class="link text-4 chat__user-header-name">Андрей</a>
                    </div>
                    {{{ PopupOptions }}}
                </div>
                <div class="chat__main">
                    <div class="chat__main-group">
                        <time datetime="19 июня" class="text-5 chat__main-time">19 июня</time>
                        <div class="chat__main-message chat__main-message--sender">
                            Привет! Смотри, тут всплыл интересный кусок лунной космической истории&nbsp;&mdash; НАСА в&nbsp;какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на&nbsp;Луну. Сейчас мы&nbsp;все знаем что астронавты летали с&nbsp;моделью 500&nbsp;EL&nbsp;&mdash; и&nbsp;к&nbsp;слову говоря, все тушки этих камер все еще находятся на&nbsp;поверхности Луны, так как астронавты с&nbsp;собой забрали только кассеты с&nbsp;пленкой.

                            Хассельблад в&nbsp;итоге адаптировал SWC для космоса, но&nbsp;что-то пошло не&nbsp;так и&nbsp;на&nbsp;ракету они так никогда и&nbsp;не&nbsp;попали. Всего их&nbsp;было произведено 25&nbsp;штук, одну из&nbsp;них недавно продали на&nbsp;аукционе за&nbsp;45000&nbsp;евро.
                            <time datetime="" class="text-7 chat__main-message-time">11:56</time>
                        </div>
                        <div class="chat__main-message chat__main-message--sender">
                            <img src="/img/image.png" alt="Изображение">
                            <time datetime="" class="text-7 chat__main-message-time">11:56</time>
                        </div>
                        <div class="chat__main-message chat__main-message--myself">
                            Круто!
                            <time datetime="" class="text-7 chat__main-message-time">11:58</time>
                        </div>
                        <div class="chat__main-message chat__main-message--myself">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempore impedit officiis, ut dolorum recusandae nisi blanditiis dolor atque dolorem repudiandae doloribus magni sunt dolore quam iure eveniet. Nesciunt, debitis.
                            <time datetime="" class="text-7 chat__main-message-time">11:58</time>
                        </div>

                        <div class="chat__main-message chat__main-message--sender">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos tempore impedit officiis, ut dolorum recusandae nisi blanditiis dolor atque dolorem repudiandae doloribus magni sunt dolore quam iure eveniet. Nesciunt, debitis.
                            <time datetime="" class="text-7 chat__main-message-time">11:58</time>
                        </div>
                    </div>
                </div>
                <form class="chat__footer" novalidate>
                    {{{ PopupAttachments }}}
                    {{{ Input onChange=handleInputChange value=message name="message" placeholder="Сообщение" class="input-outlined chat__footer-search" }}}
                    {{{ Button disabled=disabledSendButton onClick=onSubmit type="submit" class="button chat__footer-button-submit" imgSource="/icons/arrow-right-white.svg" }}}
                </form>
            </div>
        `
    }
}

export default ChatMessages;
