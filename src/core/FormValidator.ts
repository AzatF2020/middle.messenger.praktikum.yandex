interface IFormValidator {
  resetValidationRules: () => void;

  hasFormErrors: () => boolean;

  handleValidateInput: (event: InputEvent) => void;
}

type FormValidatorConfig = {
  formSelector?: string;
  rules: Record<string, Record<string, Function>>;
};

class FormValidator implements IFormValidator {
  public formSelector: string;

  public rules: Record<string, Record<string, Function>>;

  public errors: Record<string, string[]>;

  private _formElement: HTMLFormElement | null = null;

  private _formInputElements: NodeListOf<HTMLInputElement> | null = null;

  constructor({ formSelector = '', rules = {} }: FormValidatorConfig) {
    this.formSelector = formSelector;
    this.rules = rules;
    this.errors = {};
  }

  private _getFormElements() {
    if (!this.formSelector) {
      throw new Error('Не указан селектор формы.');
    }

    this._formElement = document.querySelector(this.formSelector);
    this._formInputElements = this._formElement!.querySelectorAll('input');
  }

  private _setFormErrors(target: HTMLInputElement) {
    const { name, value } = target;
    const errorsSet = new Set<string>();

    Object.values(this.rules[name]).forEach((validator) => {
      const validatorResult = validator(value);
      validatorResult.length && errorsSet.add(validatorResult);
    });

    this.errors[name] = Array.from(errorsSet);
  }

  public resetValidationRules() {
    this.errors = {};
  }

  public hasFormErrors(): boolean {
    return Object.values(this.errors).some((array) => array.length > 0);
  }

  public handleValidateInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;

    if (!target?.name) {
      throw new Error('Атрибут name обязательный.');
    }

    if (!(target.name in this.rules)) {
      return;
    }

    this._setFormErrors(target);
  }

  public validate() {
    this._getFormElements();

    this._formInputElements?.forEach((target) => {
      if (target.name in this.rules) {
        this._setFormErrors(target);
      }
    });

    return this.hasFormErrors();
  }
}

export default FormValidator;
