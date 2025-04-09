import Component from '@core/Component';
import FormValidator from '@core/FormValidator';
import {
  required,
  isLatin,
  minLength,
  acceptedSigns,
} from '@utils/constants/validationRules';
import ChatsController from '@controllers/ChatsController';
import template from './template.hbs?raw';
import './style.scss';

interface IModalCreateChat {
  handleCloseModal(event: Event): void;

  closeByOverlay(event: Event): void;

  handleInputChange(event: Event): void;

  validateInput(event: InputEvent): void;

  onSubmit(event: Event): void;
}

type ModalCreateChatProps = {
  handleCloseModal?: (event: Event) => void;
  isActive?: boolean;
};

const validation = new FormValidator({
  formSelector: '.modal-create-chat__form',
  rules: {
    title: {
      required,
      isLatin,
      minLength: minLength(3),
      acceptedSigns: acceptedSigns('_'),
    },
  },
});

class ModalCreateChat extends Component implements IModalCreateChat {
  public chatsController: ChatsController;

  constructor(props: ModalCreateChatProps) {
    super(props);

    this.chatsController = new ChatsController();

    this.state = {
      title: '',
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

  public async onSubmit(event: Event) {
    event.preventDefault();

    const isValid = validation.validate();

    this.setState({
      ...this.state,
      isButtonDisabled: isValid,
      errors: validation.errors,
    });

    if (!isValid) return;

    const selectedUserId = window.store.getState().selectedUserOnSearch.id;

    await this.chatsController.createChat({
      title: this.state.title,
    }, [selectedUserId]);

    this.props.handleCloseModal(event);
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
      '.modal-create-chat__inner',
    ) as HTMLElement;

    if (!modalInner.contains(event.target as HTMLElement)) {
      this.props.handleCloseModal(event);
    }
  }

  public render() {
    return template;
  }
}

export default ModalCreateChat;
