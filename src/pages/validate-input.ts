import { FormType } from '../types/index';
import { FORM_TYPE } from './const';
import validateBirthDate from './registration/logic/validate-birth-date';
import validateName from './registration/logic/validate-name';
import validatePostalCode from './registration/logic/validate-postal-code';
import validateStreet from './registration/logic/validate-street';
import validateEmail from './validate-email';
import validatePassword from './validate-password';

const warning: { [key: string]: { [key: string]: string } } = {
  [FORM_TYPE.login]: {
    email: '',
    password: '',
  },
  [FORM_TYPE.registration]: {
    email: '',
    password: '',
    'first-name': '',
    'last-name': '',
    'date-of-birth': '',
    'postal-code': '',
    street: '',
    city: '',
  },
};

export default function validateInput(formType: FormType, input: HTMLInputElement): { [key: string]: string } {
  const inputName: string = input.classList[0].split('__')[1];
  switch (input.type) {
    case 'email':
      warning[formType].email = validateEmail(input.value);
      break;
    case 'password':
      warning[formType].password = validatePassword(input.value);
      break;
    case 'text':
      // for the case when checkbox changes input type password to text
      switch (inputName) {
        case 'password':
          warning[formType][inputName] = validatePassword(input.value);
          break;
        case 'first-name':
        case 'last-name':
        case 'city':
          warning[formType][inputName] = validateName(input.value, inputName);
          break;
        case 'postal-code':
          warning[formType][inputName] = validatePostalCode(input.value);
          break;
        case 'street':
          warning[formType][inputName] = validateStreet(input.value);
          break;
        default:
          break;
      }
      break;

    case 'date':
      warning[formType]['date-of-birth'] = validateBirthDate(input.value);
      break;
    default:
      break;
  }

  return warning[formType];
}
