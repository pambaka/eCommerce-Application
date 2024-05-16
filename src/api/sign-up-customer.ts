import showErrorModal from '../pages/show-error-modal';
import { Address } from '../types/index';
import { region } from './const';
import getAccessToken from './get-access-token';

export default async function signUpCustomer(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  dateOfBirth: string,
  shippingAddress: Address,
): Promise<void> {
  const customerAccessToken: string | undefined = await getAccessToken();

  if (customerAccessToken) {
    await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/customers`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${customerAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        password,
        dateOfBirth,
        addresses: [shippingAddress],
      }),
    })
      .then((res) => {
        console.log('res:', res);
        if (res.status === 201) {
          showErrorModal('Customer was successfully created', '', true);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }
}
