import Handlebars, { HelperOptions } from 'handlebars';
import Component from './Component';

export interface ComponentConstructable<Props extends Record<string, unknown>> {
    new (props: Props): Component;
}

/* # Рекурсивный проход по DOM-дереву относительно найденного родительского контейнера, где произошел триггер */
const walkDomParentContainer = (
  container: any[] | NodeListOf<ChildNode>,
  options: HelperOptions,
  component: Component,
): string | null => {
  for (let i = 0; i <= container?.length!; i += 1) {
    if (container[i] && container[i].nodeType === Node.ELEMENT_NODE) {
      if (container[i].hasAttribute('data-id')) {
        const ATTR_DATA_ID = container[i].getAttribute('data-id');

        // # Заменяем дочерний компонент на новый
        options.data.root.children[ATTR_DATA_ID] = component;

        // # Тригерим события
        component.eventBus().emit(Component.EVENTS.INIT);

        // # Удаляем дочерний компонент
        if (container[i].parentNode) {
          container[i].remove();
        }

        return `
                    <div data-id="${ATTR_DATA_ID}"></div>
                `;
      } if (container[i].childNodes.length >= 1) {
        const result = walkDomParentContainer(
          container[i].childNodes,
          options,
          component,
        );

        if (result) {
          return result;
        }
      }
    }
  }
  return null;
};

const registerComponent = (
  componentName: string,
  componentClass: ComponentConstructable<any>,
) => {
  Handlebars.registerHelper(
    componentName,
    function (this: any, options: HelperOptions) {
      if (!options.data.root?.children) {
        options.data.root.children = {};
      }

      if (!options.data.root?.refs) {
        options.data.root.refs = {};
      }

      (Object.keys(options.hash) as any).forEach(
        (key: string | never) => {
          if (this[key] && typeof this[key] === 'string') {
            options.hash[key] = options.hash[key].replace(
              new RegExp(`{{${String(key)}}}`, 'i'),
              this[key],
            );
          }
        },
      );

      const component = new (componentClass as any)(options.hash);

      // # Получаем родительский контейнер, где произошел триггер
      const containerNodes = document.querySelector(
        `[data-id="${options.data.root.__id}"]`,
      )!?.childNodes;

      if (containerNodes) {
        return walkDomParentContainer(
          containerNodes,
          options,
          component,
        );
      }

      options.data.root.children[component._id] = component;

      component.eventBus().emit(Component.EVENTS.INIT);
      component.eventBus().emit(Component.EVENTS.FLOW_CDM);

      return `
                <div data-id="${component._id}"></div>
            `;
    },
  );
};

export default registerComponent;
