import signUpCustomer from '../../../api/sign-up-customer';
import { CLASS_NAMES, ID_NAMES } from '../../../const';

export default function handleSubmitRegistration(event: Event) {
  event.preventDefault();
  const email = document.querySelector(`.${CLASS_NAMES.emailInput}`);
  const password = document.querySelector(`.${CLASS_NAMES.passwordInput}`);
  const firstName = document.querySelector(`.${CLASS_NAMES.firstName}`);
  const lastName = document.querySelector(`.${CLASS_NAMES.lastName}`);
  const birthDate = document.querySelector(`.${CLASS_NAMES.birthDate}`);
  const countryShipping = document.querySelector(`.registration__address .${CLASS_NAMES.country}`);
  const postalCodeShipping = document.querySelector(`.registration__address .${CLASS_NAMES.postalCode}`);
  const streetShipping = document.querySelector(`.registration__address .${CLASS_NAMES.street}`);
  const cityShipping = document.querySelector(`.registration__address .${CLASS_NAMES.city}`);
  const isDefaultShipping = document.getElementById(ID_NAMES.defaultShipping);
  if (
    email instanceof HTMLInputElement &&
    password instanceof HTMLInputElement &&
    firstName instanceof HTMLInputElement &&
    lastName instanceof HTMLInputElement &&
    birthDate instanceof HTMLInputElement &&
    countryShipping instanceof HTMLSelectElement &&
    postalCodeShipping instanceof HTMLInputElement &&
    streetShipping instanceof HTMLInputElement &&
    cityShipping instanceof HTMLInputElement &&
    isDefaultShipping instanceof HTMLInputElement
  ) {
    signUpCustomer(
      email.value,
      password.value,
      firstName.value,
      lastName.value,
      birthDate.value,
      {
        country: countryShipping.value,
        postalCode: postalCodeShipping.value,
        streetName: streetShipping.value,
        city: cityShipping.value,
      },
      isDefaultShipping.checked,
    );
  }
}
