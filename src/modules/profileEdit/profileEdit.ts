import { connectStore } from '@core/index';
import Component from '@core/Component';
import FormValidator from '@core/FormValidator';
import AuthController from '@controllers/AuthController';
import ProfileController from '@controllers/ProfileController';
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
  public profileController: ProfileController;

  public formData: FormData;

  public initialState: Record<string, string | number | null>;

  constructor() {
    super();

    this.profileController = new ProfileController();

    this.formData = new FormData();

    this.initialState = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
      avatar: '/img/plug.png',
    };

    this.state = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      display_name: '',
      phone: '',
      avatar: '/img/plug.png',
      isButtonDisabled: false,
      isFormReadonly: true,
      isPasswordChangedFlag: false,
      errors: {},
    };

    this.listeners = {
      handleInputBlur: this.validateInput.bind(this),
      onSubmit: this.onSubmit.bind(this),
      setAvatarImg: this.setAvatarImg.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      changeFormDataState: this.changeFormDataState.bind(this),
      showChangePasswordForm: this.showChangePasswordForm.bind(this),
      cancelPasswordChange: this.showChangePasswordForm.bind(this),
      cancelSubmit: this.cancelSubmit.bind(this),
      logout: this.profileController.logout,
    };
  }

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

    await this.profileController.updateProfile(this.state, this.formData);
    this.changeFormDataState();
  }

  public async setAvatarImg(event: Event) {
    const { files } = event.target as HTMLInputElement;
    const file = files![0];

    this.formData.append('avatar', files![0]);

    const readFileAsDataURL = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (loadEvent) => resolve(loadEvent.target!.result);
      reader.readAsDataURL(file);
    });

    const avatar = await readFileAsDataURL;

    this.setState({ ...this.state, avatar });
  }

  public async componentBeforeMount() {
    const user = await new AuthController().redirectUser();
    if (!user) return;

    Object.entries(user).forEach(([key, value]) => {
      if (key === 'avatar') {
        this.setState({ ...this.state, [key]: value ? `${import.meta.env.VITE_BACKEND_STORAGE}${value}` : '/img/plug.png' });
        this.initialState[key] = `${import.meta.env.VITE_BACKEND_STORAGE}${value}` || '/img/plug.png';
      } else {
        this.initialState[key] = value;
        this.setState({ ...this.state, [key]: value });
      }
    });
  }

  public cancelSubmit() {
    this.setState({ ...this.state, ...this.initialState });
    this.changeFormDataState();
  }

  public validateInput(event: InputEvent) {
    validation.handleValidateInput(event);
    this.setState({
      ...this.state,
      isButtonDisabled: validation.hasFormErrors(),
      errors: validation.errors,
    });
  }

  public changeFormDataState() {
    this.setState({
      ...this.state,
      isFormReadonly: !this.state.isFormReadonly,
    });
  }

  public showChangePasswordForm() {
    this.setState({
      ...this.state,
      isPasswordChangedFlag: !this.state.isPasswordChangedFlag,
    });
  }

  public render() {
    return template;
  }
}

export default connectStore(ProfileEdit, (state) => ({
  me: state.user,
  loading: state.loading,
}));
