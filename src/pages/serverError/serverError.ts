import Component from "@core/Component";

class ServerError extends Component {
    render() {
        return `
            <main class="container--centered">
                {{{ Error title="500" text="Мы уже фиксим" }}}
            </main>
        `
    }
}

export default ServerError;
