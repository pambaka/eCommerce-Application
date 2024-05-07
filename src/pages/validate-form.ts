import { FORM_TYPE, FormType } from './const';
import validateInput from './validate-input';

export default function validateForm(event: Event) {
  const input = event.target;

  if (input instanceof HTMLInputElement) {
    const formType = input.classList[0].split('__')[0];

    if (formType in FORM_TYPE) {
      const warning = validateInput(formType as FormType, input);
      console.log(warning);
    }
  }
}
