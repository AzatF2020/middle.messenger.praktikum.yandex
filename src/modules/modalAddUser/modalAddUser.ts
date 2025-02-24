import Component from '@core/Component';
import FormValidator from '@utils/helpers/FormValidator';
import {
  minLength,
  maxLength,
  acceptedSigns,
  hasAlphanumericContent,
  isLatin,
} from '@utils/constants/validationRules';
import template from './template.hbs?raw';
import './style.scss';

interface IModalAddUser {
    handleCloseModal(event: Event): void;
    closeByOverlay(event: Event): void;
    handleInputChange(event: Event): void;
    validateInput(event: InputEvent): void;
    onSubmit(event: Event): void;
}

type ModalAddUserProps = {
    handleCloseModal?: (event: Event) => void;
    isActive?: boolean;
};

const validation = new FormValidator({
  formSelector: '.user-add-modal__form',
  rules: {
    login: {
      isLatin,
      hasAlphanumericContent,
      minLength: minLength(3),
      maxLength: maxLength(20),
      acceptedSigns: acceptedSigns('_', '-'),
    },
  },
});

class ModalAddUser extends Component implements IModalAddUser {
  constructor(props: ModalAddUserProps) {
    super(props);

    this.state = {
      login: '',
      isButtonDisabled: false,
      errors: {},
    };

    this.listeners = {
      handleInputBlur: this.validateInput.bind(this),
      click: this.closeByOverlay.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      onSubmit: this.onSubmit.bind(this),
    };
  }

  public handleCloseModal!: (event: Event) => void;

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

  public closeByOverlay(event: Event) {
    const modalInner = document.querySelector(
      '.user-add-modal__inner',
    ) as HTMLElement;

    if (!modalInner.contains(event.target as HTMLElement)) {
      this.props.handleCloseModal(event);
    }
  }

  public render() {
    return template;
  }
}

export default ModalAddUser;
