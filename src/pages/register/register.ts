import { Component } from "@core/index";

class RegisterPage extends Component {
    public render() {
        return `
            <main class="container--centered">
                <section>
                    {{{ RegisterForm }}}
                </section>
            </main>
        `
    }
}

export default RegisterPage;
