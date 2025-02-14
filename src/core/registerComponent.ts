import Component from "./Component"
import Handlebars, { HelperOptions } from "handlebars"

/* # Рекурсивный проход по DOM-дереву относительно найденного родительского контейнера, где произошел триггер */
const walkDomParentContainer = (container: any[] | NodeListOf<ChildNode>, options: HelperOptions, component: Component): string | undefined => {
    for (let i = 0; i <= container?.length!; i++) {
        if (container[i] && container[i].nodeType === Node.ELEMENT_NODE) {
            if (container[i].hasAttribute('data-id')) {
                // if (container[i].childNodes.length >= 1) {
                //     const result = walkDomParentContainer(container[i].childNodes, options, component)

                //     if (result) {
                //         return result
                //     }
                // }

                /* # Если дочерний компонент уже создан, то удаляем его
                при ререндере родителя, сохраняя состояние самого дочернего компнента и заменяя его */

                const ATTR_DATA_ID = container[i].getAttribute('data-id')

                // # Заменяем дочерний компонент на новый
                options.data.root.children[ATTR_DATA_ID] = component;

                // # Тригерим события
                component.eventBus().emit(Component.EVENTS.INIT)

                // # Удаляем дочерний компонент
                container[i].remove()

                return `
                    <div data-id="${ATTR_DATA_ID}">
                    </div>
                `
            } else if (container[i].childNodes.length >= 1) {
                const result = walkDomParentContainer(container[i].childNodes, options, component)

                if (result) {
                    return result
                }
            }
        }
    }
}

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

            // # Получаем родительский контейнер, где произошел триггер
            const containerNodes = document.querySelector(`[data-id="${options.data.root.__id}"]`)!?.childNodes

            if (containerNodes) {
                return walkDomParentContainer(containerNodes, options, component)
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
