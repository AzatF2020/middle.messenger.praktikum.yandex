import { Component } from "../../core";
import './style.scss';

interface InputProps {
    onChange?: () => void;
    onInput?: () => void;
    value: string;
    placeholder?: string;
    disabled?: boolean;
    class?: string;
    id?: string;
    type?: string;
    readonly?: boolean
}

class Input extends Component {
    constructor(props: InputProps) {
        super(props);

        this.listeners = { change: this.props.onChange, input: this.props.onInput }
    }

    render() {
        return `
            <input
                type="${this.props.type ?? 'text'}"
                class="input ${this.props.class ?? ''}"
                ${this.props.disabled ? 'disabled' : ''}
                ${this.props.readonly ? 'readonly' : ''}
                id="{{ id }}"
                name="{{ name }}"
                placeholder="{{ placeholder }}"
                value="{{ value }}"
            />
        `
    }
}

export default Input;
