import { CLASS_NAMES } from '../../../const';

export default function togglePasswordVisibility(): void {
  const inputPassword = document.querySelector(`.${CLASS_NAMES.loginPassword}`);

  if (inputPassword instanceof HTMLInputElement) {
    if (inputPassword.type === 'password') inputPassword.type = 'text';
    else inputPassword.type = 'password';
  }
}
