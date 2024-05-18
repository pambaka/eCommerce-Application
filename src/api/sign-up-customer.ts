import showModal from '../pages/show-modal';
import Router from '../services/router';
import { Address, CustomerData } from '../types/index';
import setLocationHash from '../utils/set-location-hash';
import { region } from './const';
import getAccessToken from './get-access-token';

export default async function signUpCustomer(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  shippingAddress: Address,
  isDefaultShipping: boolean,
): Promise<void> {
  const customerAccessToken: string | undefined = await getAccessToken();

  const customerData: CustomerData = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses: [shippingAddress],
    shippingAddresses: [0],
  };

  if (isDefaultShipping) customerData.defaultShippingAddress = 0;

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
        console.log('res:', res);
        if (res.status === 201) {
          sessionStorage.setItem('isCustomerAuthorized', 'true');
          setLocationHash(Router.pages.main);
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
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
}
