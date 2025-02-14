import { Component } from "../../core";
import './style.scss';

interface InputProps {
    onChange: () => any;
    value: string;
    placeholder: string;
    disabled: boolean;
    class: string;
    id: string;
    type: string;
}

class Input extends Component {
    constructor(props: InputProps) {
        super(props);

        this.listeners = { change: this.props.onChange }
    }

    render() {
        return `
            <input
                type="${this.props.type ?? 'text'}"
                ${this.props.id ? `id="${this.props.id}"` : ''}
                ${this.props.name ? `name="${this.props.name}"` : ''}
                ${this.props.placeholder ? `placeholder="${this.props.placeholder}"` : ''}
                ${this.props.disabled ? 'disabled' : ''}
                value="${this.props.value}"
                class="input ${this.props.class ?? ''}"
            />
        `
    }
}

export default Input;
