import { Component } from "../../core";
import './style.scss';

interface ButtonProps {
    onClick: () => void;
    label?: string;
    disabled?: boolean;
    class?: string;
    type?: 'button' | 'submit' | 'reset';
    title?: string;
    imgSource?: string;
}

class Button extends Component {
    constructor(props: ButtonProps) {
        super(props);
        this.listeners = { click: this.props.onClick }
    }

    render() {
        return `
            <button
                class="${this.props.class ?? 'button'}"
                type="${this.props.type ?? 'button'}"
                ${this.props.disabled ? 'disabled' : ''}
                title="{{ title }}"
            >
                {{#ifCond imgSource '&&' label }}
                    <img src="{{ imgSource }}" alt="icon" />
                    <span>{{ label }}</span>
                {{ else if imgSource}}
                    <img src="{{ imgSource }}" alt="icon" />
                {{ else if label }}
                    {{ label }}
                {{/ifCond}}
            </button>
        `
    }
}

export default Button;
