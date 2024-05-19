import signUpCustomer from '../../../api/sign-up-customer';
import { CLASS_NAMES, ID_NAMES } from '../../../const';
import assertNonNullable from '../../../utils/assert-non-nullable';

export default function handleSubmitRegistration(event: Event) {
  event.preventDefault();
  const email = assertNonNullable<HTMLInputElement>(`.${CLASS_NAMES.emailInput}`);
  const password = assertNonNullable<HTMLInputElement>(`.${CLASS_NAMES.passwordInput}`);
  const firstName = assertNonNullable<HTMLInputElement>(`.${CLASS_NAMES.firstName}`);
  const lastName = assertNonNullable<HTMLInputElement>(`.${CLASS_NAMES.lastName}`);
  const birthDate = assertNonNullable<HTMLInputElement>(`.${CLASS_NAMES.birthDate}`);
  const countryShipping = assertNonNullable<HTMLSelectElement>(`.registration__address .${CLASS_NAMES.country}`);
  const postalCodeShipping = assertNonNullable<HTMLInputElement>(`.registration__address .${CLASS_NAMES.postalCode}`);
  const streetShipping = assertNonNullable<HTMLInputElement>(`.registration__address .${CLASS_NAMES.street}`);
  const cityShipping = assertNonNullable<HTMLInputElement>(`.registration__address .${CLASS_NAMES.city}`);
  const isDefaultShipping = assertNonNullable<HTMLInputElement>(`#${ID_NAMES.defaultShipping}`);

  // const countryBilling = assertNonNullable<HTMLSelectElement>(
  //   `.registration__shipping-address .${CLASS_NAMES.country}`,
  // );
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
