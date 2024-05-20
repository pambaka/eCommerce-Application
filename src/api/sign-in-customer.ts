import { region } from './const';
import getCustomerTokens from './get-customer-tokens';
import replaceLocation from '../utils/replace-location';
import Router from '../services/router';
import { dispatchAuthorizationChangeEvent } from '../utils/authorization-event';

export default async function signInCustomer(email: string, password: string): Promise<void> {
  const customerAccessToken: string | undefined = await getCustomerTokens(email, password);

  if (customerAccessToken) {
    await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/login`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${customerAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        console.log('login:', res);

        if (res.status === 200) {
          replaceLocation(Router.pages.main);
          sessionStorage.setItem('isCustomerAuthorized', 'true');
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);
        sessionStorage.setItem('userName', data.customer.firstName);
        dispatchAuthorizationChangeEvent(true);
      })
      .catch((error) => console.log(error));
  }
}
