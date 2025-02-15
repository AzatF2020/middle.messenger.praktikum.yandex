import Component from "@core/Component";
import './style.scss';


class Chats extends Component {
    render() {
        return `
            <section class="chats">
                <div class="chats__container">
                    {{{ ChatUsers }}}
                    {{{ ChatMessages }}}
                    {{{ ModalAddUser }}}
                </div>
            </section>
        `
    }
}

export default Chats
