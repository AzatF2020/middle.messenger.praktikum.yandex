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
                class="input ${this.props.class ?? ''}"
                ${this.props.disabled ? 'disabled' : ''}
                id="{{ id }}"
                name="{{ name }}"
                placeholder="{{ placeholder }}"
                value="{{ value }}"
            />
        `
    }
}

export default Input;
