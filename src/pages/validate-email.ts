import { reEmail } from './const';

export default function validateEmail(email: string): string {
  let warning: string = '';

  const isEmailValid = reEmail.test(email);

  if (!isEmailValid) {
    warning = 'Enter valid e-mail address.';
  }

  return warning;
}
