import {
  Component, FormValidator,
} from '@core/index';
import {
  minLength,
  maxLength,
  acceptedSigns,
  hasAlphanumericContent,
  requiredMinimumUpperCaseAndNumbers,
  isLatin,
} from '@utils/constants/validationRules';
import AuthController from '@controllers/AuthController';
import template from './template.hbs?raw';
import './style.scss';

interface ILoginForm {
  handleInputChange: (event: Event) => void;
  validateInput: (event: InputEvent) => void;
  onSubmit: (event: Event) => void;
}

type LoginFormProps = {
  loading?: boolean;
  [key: string]: unknown;
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
  public authController: AuthController;

  constructor(props: LoginFormProps = {}) {
    super(props);

    this.authController = new AuthController();

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
      goToRegister: () => window.router.go('/sign-up'),
    };
  }

  public handleInputChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;

    this.setState({ ...this.state, [name]: value });
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

    this.authController.login({
      login: this.state.login,
      password: this.state.password,
    });
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
