import { Component } from "../../core";
import "./style.scss";

interface InputProps {
    onChange?: () => void;
    onBlur?: () => void;
    onInput?: () => void;
    value: string;
    placeholder?: string;
    disabled?: boolean;
    class?: string;
    id?: string;
    type?: string;
    readonly?: boolean;
    required?: boolean;
}

class Input extends Component {
    constructor(props: InputProps) {
        super(props);

        this.listeners = {
            change: this.props.onChange,
            input: this.props.onInput,
            blur: this.props.onBlur,
        };
    }

    render() {
        return `
            <input
                type="${this.props.type ?? "text"}"
                class="input ${this.props.class ?? ""}"
                ${this.props.disabled ? "disabled" : ""}
                ${this.props.readonly ? "readonly" : ""}
                id="{{ id }}"
                name="{{ name }}"
                placeholder="{{ placeholder }}"
                value="{{ value }}"
                ${this.props.required ? "required" : ""}
            />
        `;
    }
}

export default Input;
