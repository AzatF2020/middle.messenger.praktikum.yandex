import Component from '@core/Component';
import template from './template.hbs?raw';
import './style.scss';

interface AvatarProps {
    setImg: () => void;
    imgSrc?: string;
    readonly?: boolean;
}

class Avatar extends Component {
  constructor({
    imgSrc = '/img/plug.png',
    readonly = false,
    setImg = () => {},
  }: AvatarProps) {
    super({ imgSrc, readonly, setImg });
  }

  public render() {
    return template;
  }
}

export default Avatar;
