import Component from '@core/Component';
import ResourcesController from '@controllers/ResourcesController';
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
  public resourcesController: ResourcesController;

  public chatsController: ChatsController;

  public formData: FormData;

  constructor(props: ModalSendMediaProps) {
    super(props);

    this.resourcesController = new ResourcesController();

    this.chatsController = new ChatsController();

    this.formData = new FormData();

    this.state = {
      title: '',
      isButtonDisabled: true,
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

    this.formData.append('resource', files![0]);

    const readFileAsDataURL = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (loadEvent: Event) => resolve((loadEvent.target as FileReader).result);
      reader.readAsDataURL(file);
    });

    const resource = await readFileAsDataURL;

    this.setState({
      ...this.state,
      isFileSelected: true,
      isButtonDisabled: false,
      resource,
    });
  }

  public async onSubmit(event: Event) {
    event.preventDefault();

    if (!this.formData.get('resource')) return;

    const resourceId = await this.resourcesController.uploadFile(this.formData);

    await this.chatsController.sendChatFile(resourceId);

    this.props.handleCloseModal(event);
  }

  public resetFileSource() {
    this.formData = new FormData();

    this.setState({
      ...this.state, isFileSelected: false, resource: null,
    });
  }

  public closeByOverlay(event: Event) {
    const modalInner = document.querySelector(
      '.modal-send-media__inner',
    ) as HTMLElement;

    if (!modalInner.contains(event.target as HTMLElement)) {
      this.props.handleCloseModal(event);
      this.setState({
        ...this.state, isFileSelected: false, resource: null, isButtonDisabled: true,
      });
    }
  }

  public render() {
    return template;
  }
}

export default ModalSendMedia;
