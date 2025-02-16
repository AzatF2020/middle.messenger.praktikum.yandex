import Component from "@core/Component";
import './style.scss';

interface AvatarProps {
    setImg: () => void;
    imgSrc?: string;
    readonly?: boolean
}

class Avatar extends Component {
    constructor({
        imgSrc = "/img/plug.png",
        readonly = false,
        setImg = () => {},
    }: AvatarProps) {
        super({ imgSrc, readonly, setImg })
    }

    render() {
        return `
            <div class="avatar">
                <img src="{{ imgSrc }}" alt="Заглушка" class="avatar__plug">
                <label class="text-4 avatar__label" for="avatar">Поменять аватар</label>
                {{{ Input onChange=setImg class="avatar__input" id="avatar" type="file" readonly=readonly name="avatar" }}}
            </div>
        `
    }
}

export default Avatar;
