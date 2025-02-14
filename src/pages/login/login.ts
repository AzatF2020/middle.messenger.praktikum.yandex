import { Component } from "@core/index";

class LoginPage extends Component {
    public render() {
        return `
            <section class="container--centered">
                {{{ LoginForm }}}
            </section>
        `
    }
}

export default LoginPage;
