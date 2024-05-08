import { reEmail } from './const';

export default function validateEmail(email: string): string {
  let warning: string = '';

  const isEmailValid = reEmail.test(email);

  if (email === '') {
    warning = 'E-mail is required.';
  } else if (!isEmailValid) {
    warning = 'Invalid e-mail format.';
  }

  return warning;
}
