import { CLASS_NAMES, DOM } from '../const';
import { FORM_TYPE } from './const';
import validateInput from './validate-input';

export default function validateForm(event: Event) {
  const input = event.target;

  if (input instanceof HTMLInputElement) {
    const formType = input.classList[0].split('__')[0];

    if (formType === FORM_TYPE.login) {
      const button = DOM.elements[CLASS_NAMES.loginButton];

      button.setAttribute('disabled', '');

      const warning = validateInput(formType, input);

      console.log(warning);

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
