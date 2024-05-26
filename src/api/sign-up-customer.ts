import showModal from '../pages/show-modal';
import Router from '../services/router';
import { Address, CustomerData } from '../types/index';
import replaceLocation from '../utils/replace-location';
import { region } from './const';
import getAccessToken from './get-access-token';
import { dispatchAuthorizationChangeEvent } from '../utils/authorization-event';

export default async function signUpCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  shippingAddress: Address,
  isDefaultShipping: boolean,
  billingAddress: Address,
  isDefaultBilling: boolean,
): Promise<void> {
  const customerAccessToken: string | undefined = await getAccessToken();

  const customerData: CustomerData = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses: [shippingAddress, billingAddress],
    shippingAddresses: [0],
    billingAddresses: [1],
  };

  if (isDefaultShipping) customerData.defaultShippingAddress = 0;
  if (isDefaultBilling) customerData.defaultBillingAddress = 1;

  if (customerAccessToken) {
    await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/customers`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${customerAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    })
      .then((res) => {
        if (res.status === 201) {
          sessionStorage.setItem('isCustomerAuthorized', 'true');
          replaceLocation(Router.pages.main);
          showModal('Customer was successfully created', '', true);
        }

        if (res.status === 400) {
          showModal(
            'Account with the provided email address already exists.',
            'Log in with this email address or use another email address for registration.',
          );
        }
        if (res.status === 500 || res.status === 502 || res.status === 503 || res.status === 504) {
          showModal('Unfortunately, something went wrong during the registration process.', 'Please try again later.');
        }
        return res.json();
      })

      .then((data) => {
        sessionStorage.setItem('userName', data.customer.firstName);

        dispatchAuthorizationChangeEvent(true);
      })

      .catch((error) => error);
  }
}
