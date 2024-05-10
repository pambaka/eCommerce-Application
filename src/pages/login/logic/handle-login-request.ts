import signInCustomer from '../../../api/sign-in-customer';
import { CLASS_NAMES } from '../../../const';

export default async function handleLoginRequest(event: Event): Promise<void> {
  event.preventDefault();

  const email = document.querySelector(`.${CLASS_NAMES.loginLogin}`);
  const password = document.querySelector(`.${CLASS_NAMES.loginPassword}`);

  if (email instanceof HTMLInputElement && password instanceof HTMLInputElement) {
    signInCustomer(email.value, password.value);
  }
}
