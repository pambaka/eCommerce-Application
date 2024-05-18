import signUpCustomer from '../../../api/sign-up-customer';
import { CLASS_NAMES, ID_NAMES } from '../../../const';

export default function handleSubmitRegistration(event: Event) {
  event.preventDefault();
  const email = document.querySelector(`.${CLASS_NAMES.emailInput}`);
  const password = document.querySelector(`.${CLASS_NAMES.passwordInput}`);
  const firstName = document.querySelector(`.${CLASS_NAMES.firstName}`);
  const lastName = document.querySelector(`.${CLASS_NAMES.lastName}`);
  const birthDate = document.querySelector(`.${CLASS_NAMES.birthDate}`);
  const country = document.querySelector(`.${CLASS_NAMES.country}`);
  const postalCode = document.querySelector(`.${CLASS_NAMES.postalCode}`);
  const street = document.querySelector(`.${CLASS_NAMES.street}`);
  const city = document.querySelector(`.${CLASS_NAMES.city}`);
  const isDefaultShipping = document.getElementById(ID_NAMES.defaultShipping);
  if (
    email instanceof HTMLInputElement &&
    password instanceof HTMLInputElement &&
    firstName instanceof HTMLInputElement &&
    lastName instanceof HTMLInputElement &&
    birthDate instanceof HTMLInputElement &&
    country instanceof HTMLSelectElement &&
    postalCode instanceof HTMLInputElement &&
    street instanceof HTMLInputElement &&
    city instanceof HTMLInputElement &&
    isDefaultShipping instanceof HTMLInputElement
  ) {
    signUpCustomer(
      email.value,
      password.value,
      firstName.value,
      lastName.value,
      birthDate.value,
      {
        country: country.value,
        postalCode: postalCode.value,
        streetName: street.value,
        city: city.value,
      },
      isDefaultShipping.checked,
    );
  }
}
