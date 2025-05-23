import Handlebars, { HelperOptions } from 'handlebars';
import Component from './Component';

export interface ComponentConstructable<Props extends Record<string, unknown>> {
  new (props: Props): Component;
}

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

      options.data.root.children[component._id] = component;

      component.eventBus().emit(Component.EVENTS.INIT);

      component.eventBus().emit(Component.EVENTS.FLOW_CBM);

      component.eventBus().emit(Component.EVENTS.FLOW_CDM);

      component.eventBus().emit(Component.EVENTS.FLOW_CWU);

      return `
        <div data-id="${component._id}"></div>
      `;
    },
  );
};

export default registerComponent;
