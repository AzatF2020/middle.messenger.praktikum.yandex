import Component from "./Component"
import Handlebars, { HelperOptions} from "handlebars"

const registerComponent = (componentName: string, Component: Component) => {
    Handlebars.registerHelper(
        componentName,
        function (this: any, options: HelperOptions) {
            if (!options.data.root?.children) {
                options.data.root.children = {}
            }

            (Object.keys(options.hash) as any).forEach((key) => {
                if (this[key] && typeof this[key] === 'string') {
                  options.hash[key] = options.hash[key].replace(new RegExp(`{{${String(key)}}}`, 'i'), this[key]);
                }
            });

            const component = new Component(options.hash);

            const containerNodes = document.querySelector(`[data-id="${options.data.root.__id}"]`)!?.childNodes

            // # Если дочерний компонент уже создан, то удаляем его
            //   при ререндере родителя, сохраняя состояние самого дочернего компнента

            if (containerNodes) {
                for (let i = 0; i <= containerNodes?.length!; i++) {
                    if (containerNodes[i].nodeType === Node.ELEMENT_NODE && containerNodes[i].hasAttribute('data-id')) {
                        const ATTR_DATA_ID = containerNodes[i].getAttribute('data-id')
                        containerNodes[i].remove()
                        return `<div data-id="${ATTR_DATA_ID}"></div>`
                    }
                }
            }

            options.data.root.children[component._id] = component;

            component.eventBus().emit(Component.EVENTS.INIT)

            component.eventBus().emit(Component.EVENTS.FLOW_CDM)

            const content = options.fn ? options.fn(this) : '';

            return `
                <div data-id="${component._id}">
                    ${content}
                </div>
            `
        }
    )
}

export default registerComponent;
