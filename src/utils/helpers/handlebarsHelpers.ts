import Handlebars from 'handlebars';

const conditionalsHelper = () => {
  Handlebars.registerHelper(
    'ifCond',
    function (this: object, instanceOne, operator, instanceTwo, options) {
      switch (operator) {
        case '==':
          // eslint-disable-next-line eqeqeq
          return instanceOne == instanceTwo
            ? options.fn(this)
            : options.inverse(this);
        case '===':
          return instanceOne === instanceTwo
            ? options.fn(this)
            : options.inverse(this);
        case '!=':
          // eslint-disable-next-line eqeqeq
          return instanceOne != instanceTwo
            ? options.fn(this)
            : options.inverse(this);
        case '!==':
          return instanceOne !== instanceTwo
            ? options.fn(this)
            : options.inverse(this);
        case '&&':
          return instanceOne && instanceTwo
            ? options.fn(this)
            : options.inverse(this);
        case '||':
          return instanceOne || instanceTwo
            ? options.fn(this)
            : options.inverse(this);
        default:
          return options?.inverse(this);
      }
    },
  );
};

export default conditionalsHelper;
