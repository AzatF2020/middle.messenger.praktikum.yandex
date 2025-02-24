import Component from "@core/Component";
import template from "./template.hbs?raw";
import FormValidator from "@utils/helpers/FormValidator";
import {
    minLength,
    maxLength,
    requiredMinimumUpperCaseAndNumbers,
    required,
} from "@utils/constants/validationRules";
import "./style.scss";

interface IProfileNewPassword {}

const validation = new FormValidator({
    formSelector: ".profile-new-password__form",
    rules: {
        newPassword: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(40),
            requiredMinimumUpperCaseAndNumbers,
        },
    },
});

class ProfileNewPassword extends Component {
    constructor() {
        super();
        this.state = {
            oldPassword: "SamplePass321",
            newPassword: "",
            isButtonDisabled: false,
            errors: {},
        };

        this.listeners = {
            handleInputBlur: this.validateInput.bind(this),
            onSubmit: this.onSubmit.bind(this),
            handleChangeInput: this.handleChangeInput.bind(this),
        };
    }

    public handleChangeInput(event: Event) {
        const { name, value } = event.target as HTMLInputElement;
        this.setState({ ...this.state, [name]: value });
    }

    public validateInput(event: InputEvent) {
        validation.handleValidateInput(event);
        this.setState({
            ...this.state,
            isButtonDisabled: validation.hasFormErrors(),
            errors: validation.errors,
        });
    }

    public onSubmit(event: Event) {
        event.preventDefault();
        console.log(event);
    }

    public render() {
        return template;
    }
}

export default ProfileNewPassword;
