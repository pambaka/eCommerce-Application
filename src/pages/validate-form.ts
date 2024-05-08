import { CLASS_NAMES, DOM } from '../const';
import { FORM_TYPE } from './const';
import validateInput from './validate-input';

export default function validateForm(event: Event): void {
  const input: EventTarget | null = event.target;

  if (input instanceof HTMLInputElement) {
    // class name is supposed to be in format: FORM_TYPE[key] + __ + warning[FORM_TYPE[key]] key (from validate-input.ts)
    const formType: string = input.classList[0].split('__')[0];

    if (formType === FORM_TYPE.login) {
      const button: HTMLElement = DOM.elements[CLASS_NAMES.loginButton];
      button.setAttribute('disabled', '');

      const warning = validateInput(formType, input);

      const inputModule: HTMLElement | null = input.parentElement;
      const inputName: string = input.classList[0].split('__')[1];
      if (inputModule && inputName in warning) {
        inputModule.setAttribute('warning', warning[inputName]);
      }

      if (Object.values(warning).every((elem) => elem === '')) {
        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input');

        let areInputValuesExist: boolean = true;

        for (let i = 0; i < inputs.length; i += 1) {
          if (inputs[i].value === '') {
            areInputValuesExist = false;
            return;
          }
        }

        if (areInputValuesExist) {
          button.removeAttribute('disabled');
        }
      }
    }
  }
}
