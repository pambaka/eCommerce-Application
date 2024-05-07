import { FORM_TYPE, FormType } from './const';

const warning = {
  [FORM_TYPE.login]: {
    login: '',
    password: '',
  },
  [FORM_TYPE.registration]: {
    name: '',
    password: '',
    email: '',
    address: '',
  },
};

export default function validateInput(formType: FormType, input: HTMLInputElement) {
  switch (input.type) {
    case 'email':
      console.log('email');
      break;
    case 'password':
      console.log('password');
      break;
    default:
      break;
  }

  return warning[formType];
}
