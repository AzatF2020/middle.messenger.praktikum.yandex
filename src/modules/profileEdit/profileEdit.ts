import Component from '@core/Component';
import FormValidator from '@core/FormValidator';
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
  required,
} from '@utils/constants/validationRules';
import template from './template.hbs?raw';
import './style.scss';

interface IProfileEdit {
    setAvatarImg(event: Event): void;
    handleInputChange(event: Event): void;
    validateInput(event: InputEvent): void;
    onSubmit(event: Event): void;
}

const validation = new FormValidator({
  formSelector: '.profile-edit__form',
  rules: {
    email: {
      required,
      isEmail,
    },
    login: {
      required,
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
    display_name: {
      required,
      excludeNumbers,
    },
    phone: {
      onlyNumbers,
      minLength: minLength(10),
      maxLength: maxLength(15),
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(40),
      requiredMinimumUpperCaseAndNumbers,
    },
  },
});

class ProfileEdit extends Component implements IProfileEdit {
  constructor() {
    super();

    this.state = {
      email: 'pochta@yandex.ru',
      login: 'ivanivanov',
      first_name: 'Иван',
      second_name: 'Иванов',
      display_name: 'Иван',
      phone: '',
      avatar: '/img/plug.png',
      isButtonDisabled: false,
      errors: {},
    };

    this.listeners = {
      handleInputBlur: this.validateInput.bind(this),
      onSubmit: this.onSubmit.bind(this),
      setAvatarImg: this.setAvatarImg.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
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
      isButtonDisabled: isValid,
      errors: validation.errors,
    });

    if (!isValid) return;
  }

  public setAvatarImg(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.setState({ ...this.state, avatar: URL.createObjectURL(file) });
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

export default ProfileEdit;
