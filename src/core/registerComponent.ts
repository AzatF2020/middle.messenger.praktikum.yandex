import Handlebars, { HelperOptions } from 'handlebars';
import Component from './Component';

const registerComponent = <P extends Record<string, unknown>>(
  componentName: string,
  componentClass: any,
) => {
  Handlebars.registerHelper(componentName, function (this: Record<string, unknown>, options: HelperOptions) {
    if (!options.data.root?.children) {
      options.data.root.children = {};
    }

    if (!options.data.root?.refs) {
      options.data.root.refs = {};
    }

    Object.keys(options.hash).forEach((key: string) => {
      if (this[key] && typeof this[key] === 'string') {
        options.hash[key] = options.hash[key].replace(
          new RegExp(`{{${String(key)}}}`, 'i'),
          this[key] as string,
        );
      }
    });

    const component = new componentClass(options.hash as P);

    options.data.root.children[component._id] = component;

    component.eventBus().emit(Component.EVENTS.INIT);

    component.eventBus().emit(Component.EVENTS.FLOW_CBM);

    component.eventBus().emit(Component.EVENTS.FLOW_CDM);

    component.eventBus().emit(Component.EVENTS.FLOW_CWU);

    return `
      <div data-id="${component._id}"></div>
    `;
  });
};

export default registerComponent;
