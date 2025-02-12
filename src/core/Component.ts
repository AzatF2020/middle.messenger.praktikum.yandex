import Handlebars from 'handlebars';
import EventBus from "./EventBus";
import uuid from '../utils/helpers/uuid';
import tick from '../utils/helpers/tick';

class Component<P = any> {
    static EVENTS = {
        INIT: 'INIT',
        FLOW_CDM: 'flow:component_did_mount',
        FLOW_CDU: 'flow:component_did_update',
        FLOW_RENDER: 'flow:render'
    }

    eventBus: () => EventBus;

    private _element: HTMLElement | null = null;
    private _weakSet: WeakSet<any>
    _id: string;

    listeners: {}

    protected readonly props: object = {}
    protected state: any = {}
    protected children: Record<string, Component>

    constructor(props?: P) {
        const eventBus = new EventBus()

        this._weakSet = new WeakSet()
        this._id = uuid()

        this.children = {};
        this.listeners = {};

        this.props = this._makePropsProxy({ ...props, __id: this._id })
        this.state = this._makePropsProxy(this.state)

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus)
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Component.EVENTS.INIT, this._init.bind(this))
        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    private _createDocumentElement(): HTMLElement {
        return document.createElement('div')
    }

    private _makePropsProxy(props: any = {}) {
        const proxyObject = new Proxy(props as unknown as object, {
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop]
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target: Record<string, unknown>, prop: string, value: unknown) => {
                target[prop] = value
                this.eventBus().emit(Component.EVENTS.FLOW_CDU, { ...target }, target)
                return true;
            }
        })

        if (!this._weakSet.has(proxyObject)) {
            this._weakSet.add(proxyObject)
        }

        return proxyObject
    }

    private _addEvents() {
        Object.entries(this.listeners).forEach(([event, callback]) => {
            this._element!.addEventListener(event, (event: Event) => {
                event.stopImmediatePropagation();
                (callback as Function)(event)
            })
        })
    }

    private _removeEvents() {
        Object.entries(this.listeners).forEach(([event, callback]) => {
            this._element!.removeEventListener(event, (event: Event) => (callback as Function)(event))
        })
    }

    private _compile() {
        const fragment = document.createElement('template')

        const template = Handlebars.compile(this.render())({
            ...this.props,
            ...this.state,
            ...this.listeners,
            children: this.children
        })

        fragment.innerHTML = template

        Object.entries(this.children).forEach(([key, value]) => {
            const stub = fragment.content.querySelector(`[data-id="${key}"]`)

            if (stub) {
                stub!.replaceWith(value.getElement!)
            }
        })

        return fragment.content;
    }

    private _init() {
        this._element = this._createDocumentElement()

        this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }

    private _componentDidUpdate() {
        this.componentDidUpdate()
        this._render()
    }

    public componentDidUpdate() {}

    private _componentDidMount() {
        tick(() => this.componentDidMount())
    }

    public componentDidMount() {}

    public setState = (nextState: P) => {
        if (!nextState) return;

        if (this._weakSet.has(this.state)) {
            Object.assign(this.state, nextState)
            return
        }

        this.state = this._makePropsProxy(this.state)
        Object.assign(this.state, nextState)
    }

    public get getElement() {
        return this._element;
    }

    private _render() {
        const newElement = this._compile().firstElementChild!

        newElement.setAttribute('data-id', this._id)

        this._removeEvents()

        this._element!.replaceWith(newElement)

        this._element = newElement as HTMLElement;

        this._addEvents()
    }

    public render() {}
}

export default Component;
