import Component from '@core/Component';
import ChatsController from '@controllers/ChatsController';
import template from './template.hbs?raw';
import './style.scss';

interface IModalSendMedia {
  handleCloseModal(event: Event): void;

  closeByOverlay(event: Event): void;

  handleInputChange(event: Event): void;

  onSubmit(event: Event): void;
}

type ModalSendMediaProps = {
  handleCloseModal?: (event: Event) => void;
  isActive?: boolean;
};

class ModalSendMedia extends Component implements IModalSendMedia {
  public chatsController: ChatsController;

  constructor(props: ModalSendMediaProps) {
    super(props);

    this.chatsController = new ChatsController();

    this.state = {
      title: '',
      isButtonDisabled: false,
      errors: {},
      resource: null,
      isFileSelected: false,
    };

    this.listeners = {
      click: this.closeByOverlay.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      resetFileSource: this.resetFileSource.bind(this),
      onSubmit: this.onSubmit.bind(this),
    };
  }

  public handleCloseModal!: (event: Event) => void;

  public async handleInputChange(event: Event) {
    const { files } = event.target as HTMLInputElement;
    const file = files![0];

    const readFileAsDataURL = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target!.result);
      reader.readAsDataURL(file);
    });

    const resource = await readFileAsDataURL;

    this.setState({ ...this.state, isFileSelected: true, resource });
  }

  public resetFileSource() {
    this.setState({ ...this.state, isFileSelected: false, resource: null });
  }

  public async onSubmit(event: Event) {
    event.preventDefault();

    this.props.handleCloseModal(event);
  }

  public closeByOverlay(event: Event) {
    const modalInner = document.querySelector(
      '.modal-send-media__inner',
    ) as HTMLElement;

    if (!modalInner.contains(event.target as HTMLElement)) {
      this.props.handleCloseModal(event);
      this.setState({ ...this.state, isFileSelected: false, resource: null });
    }
  }

  public render() {
    return template;
  }
}

export default ModalSendMedia;
