import { region } from './const';
import getCustomerTokens from './get-customer-tokens';
import replaceLocation from '../utils/replace-location';
import Router from '../services/router';
import Customer from '../services/customer';
import Counter from '../services/counter';
import showModal from '../pages/show-modal';
import { Successful } from '../types';

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
        if (res.status !== Successful.ok) {
          showModal(':(', '');
          return undefined;
        }

        replaceLocation(Router.pages.main);

        return res.json();
      })
      .then((data) => {
        if (data) Customer.logIn(data.customer.firstName);
        else Customer.logOut();

        if (data.cart) Counter.update(false, data.cart);
        else {
          Counter.reset();
        }
      })
      .catch((error) => error);
  }
}
