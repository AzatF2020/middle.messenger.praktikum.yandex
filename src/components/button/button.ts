import { Component } from "../../core";
import './style.scss';

interface ButtonProps {
    onClick: () => any;
    label: string;
    disabled: boolean;
    class: string;
    type: 'button' | 'submit' | 'reset';
}

class Button extends Component {
    constructor(props: ButtonProps) {
        super(props);

        this.listeners = { click: this.props.onClick }
    }

    render() {
        return `
            <button
                class="button ${this.props.class ?? ''}"
                type="${this.props.type ?? 'button'}"
                ${this.props.disabled ? 'disabled' : ''}
            >
                ${this.props.label}
            </button>
        `
    }
}

export default Button;
