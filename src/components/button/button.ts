import { Component } from "../../core";

class Button extends Component {
    constructor({ onClick, disabled }: any) {
        super({ onClick, disabled });

        this.state = {
            count: 0
        }
    }

    public componentDidMount(): void {
    }

    render() {
        return `
            <button type="button">
                ${this.state.count}
            </button>
        `
    }
}

export default Button;
