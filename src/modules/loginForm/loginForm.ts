import { Component } from '@core/index';
import FormValidator from '@utils/helpers/FormValidator';
import {
  minLength,
  maxLength,
  acceptedSigns,
  hasAlphanumericContent,
  requiredMinimumUpperCaseAndNumbers,
  isLatin,
} from '@utils/constants/validationRules';
import template from './template.hbs?raw';
import './style.scss';

interface ILoginForm {
    handleInputChange: (event: Event) => void;
    validateInput: (event: InputEvent) => void;
    onSubmit: (event: Event) => void;
}

const validation = new FormValidator({
  formSelector: '.login-form',
  rules: {
    login: {
      isLatin,
      hasAlphanumericContent,
      minLength: minLength(3),
      maxLength: maxLength(20),
      acceptedSigns: acceptedSigns('_', '-'),
    },
    password: {
      minLength: minLength(8),
      maxLength: maxLength(40),
      requiredMinimumUpperCaseAndNumbers,
    },
  },
});

class LoginForm extends Component implements ILoginForm {
  constructor() {
    super();

    this.state = {
      login: '',
      password: '',
      isButtonDisabled: false,
      errors: {},
    };

    this.listeners = {
      handleInputBlur: this.validateInput.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      onSubmit: this.onSubmit.bind(this),
    };
  }

  public handleInputChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;
    this.setState({ ...this.state, [name]: value });
  }

  public onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.state);

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

export default LoginForm;
