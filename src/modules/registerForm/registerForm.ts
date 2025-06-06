import { FormValidator, Component } from '@core/index';
import {
  isEmail,
  maxLength,
  minLength,
  requiredMinimumUpperCaseAndNumbers,
  hasAlphanumericContent,
  firstLetterUppercase,
  acceptedSigns,
  isLatin,
  excludeNumbers,
  onlyNumbers,
} from '@utils/constants/validationRules';
import AuthController from '@controllers/AuthController';
import template from './template.hbs?raw';
import './style.scss';

interface IRegisterForm {
  handleInputChange(event: Event): void;
  validateInput(event: InputEvent): void;
  onSubmit(event: Event): void;
}

const validation = new FormValidator({
  formSelector: '.register-form',
  rules: {
    email: {
      isEmail,
    },
    login: {
      isLatin,
      hasAlphanumericContent,
      minLength: minLength(3),
      maxLength: maxLength(20),
      acceptedSigns: acceptedSigns('_', '-'),
    },
    first_name: {
      excludeNumbers,
      firstLetterUppercase,
      acceptedSigns: acceptedSigns('-'),
    },
    second_name: {
      excludeNumbers,
      firstLetterUppercase,
      acceptedSigns: acceptedSigns('-'),
    },
    phone: {
      onlyNumbers,
    },
    password: {
      minLength: minLength(8),
      maxLength: maxLength(40),
      requiredMinimumUpperCaseAndNumbers,
    },
  },
});

class RegisterForm extends Component implements IRegisterForm {
  public authController: AuthController;

  constructor() {
    super();

    this.authController = new AuthController();

    this.state = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      password: '',
      isButtonDisabled: false,
      errors: {},
    };

    this.listeners = {
      handleInputBlur: this.validateInput.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      onSubmit: this.onSubmit.bind(this),
      goToLogin: () => { window.router.go('/'); },
    };
  }

  public handleInputChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  public onSubmit(event: Event) {
    event.preventDefault();

    const isValid = validation.validate();

    this.setState({
      ...this.state,
      isButtonDisabled: !isValid,
      errors: validation.errors,
    });

    if (!isValid) return;

    const signupData = {
      first_name: this.state.first_name,
      second_name: this.state.second_name,
      login: this.state.login,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
    };

    this.authController.signup(signupData);
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

export default RegisterForm;
