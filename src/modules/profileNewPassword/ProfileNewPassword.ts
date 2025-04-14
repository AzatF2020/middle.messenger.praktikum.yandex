import Component from '@core/Component';
import FormValidator from '@core/FormValidator';
import {
  minLength,
  maxLength,
  requiredMinimumUpperCaseAndNumbers,
  required,
} from '@utils/constants/validationRules';
import template from './template.hbs?raw';
import './style.scss';

interface IProfileNewPassword {
    handleChangeInput(event: Event): void;
    validateInput(event: InputEvent): void;
    onSubmit(event: Event): void;
}

const validation = new FormValidator({
  formSelector: '.profile-new-password__form',
  rules: {
    oldPassword: {
      required,
    },
    newPassword: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(40),
      requiredMinimumUpperCaseAndNumbers,
    },
  },
});

class ProfileNewPassword extends Component implements IProfileNewPassword {
  constructor() {
    super();
    this.state = {
      oldPassword: 'SamplePass321',
      newPassword: '',
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

  public onSubmit(event: Event) {
    event.preventDefault();

    const isValid = validation.validate();

    this.setState({
      ...this.state,
      isButtonDisabled: isValid,
      errors: validation.errors,
    });

    if (!isValid) return;
  }

  public validateInput(event: InputEvent) {
    validation.handleValidateInput(event);
    this.setState({
      ...this.state,
      isButtonDisabled: validation.hasFormErrors(),
      errors: validation.errors,
    });
  }

  public render() {
    return template;
  }
}

export default ProfileNewPassword;
