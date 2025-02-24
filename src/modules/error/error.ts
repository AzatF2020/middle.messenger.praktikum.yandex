import Component from "@core/Component";
import template from "./template.hbs?raw";
import "./style.scss";

type ErrorProps = {
    readonly title?: string;
    readonly text?: string;
};

class Error extends Component {
    constructor(props: ErrorProps) {
        super(props);
    }

    public render() {
        return template;
    }
}

export default Error;
