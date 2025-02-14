import Component from "@core/Component";

class NotFound extends Component {
    render() {
        return `
            <main class="container--centered">
                {{{ Error title="404" text="Не туда попали" }}}
            </main>
        `
    }
}

export default NotFound;
