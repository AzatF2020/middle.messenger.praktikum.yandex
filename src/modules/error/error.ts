import Component from "@core/Component";
import './style.scss';

interface ErrorProps {
    readonly title?: string;
    readonly text?: string;
}

class Error extends Component {
    constructor(props: ErrorProps) {
        super(props)
    }

    render() {
        return `
            <section class="error">
                <h1 class="heading-1 error__title">{{ title }}</h1>
                <p class="text-3 error__text">{{ text }}</p>
                <a href="/#" class="text-5 link error__link">Назад к чатам</a>
            </section>
        `
    }
}

export default Error;
