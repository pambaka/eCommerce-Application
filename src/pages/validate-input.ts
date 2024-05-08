import { FormType } from '../types/index';
import { FORM_TYPE } from './const';
import validateEmail from './validate-email';
import validatePassword from './validate-password';

const warning = {
  [FORM_TYPE.login]: {
    email: '',
    password: '',
  },
  [FORM_TYPE.registration]: {
    email: '',
    password: '',
    name: '',
    address: '',
  },
};

export default function validateInput(formType: FormType, input: HTMLInputElement) {
  switch (input.type) {
    case 'email':
      warning[formType].email = validateEmail(input.value);
      break;
    case 'password':
      warning[formType].password = validatePassword(input.value);
      break;
    case 'text':
      // for the case when checkbox changes input type password to text
      if (input.classList[0].split('__')[1] === 'password') {
        warning[formType].password = validatePassword(input.value);
      }
      break;
    default:
      break;
  }

  return warning[formType];
}
