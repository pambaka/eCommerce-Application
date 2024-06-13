import { region } from './const';
import getCustomerTokens from './get-customer-tokens';
import replaceLocation from '../utils/replace-location';
import Router from '../services/router';
import Customer from '../utils/customer';
import Counter from '../services/counter';
import showModal from '../pages/show-modal';

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
        console.log(res);

        if (res.status !== 200) {
          showModal(':(', '');
          return undefined;
        }

        replaceLocation(Router.pages.main);

        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data) Customer.logIn(data.customer.firstName);
        else Customer.logOut();

        if (data.cart) Counter.update(false, data.cart);
        else {
          Counter.hide();
        }
      })
      .catch((error) => error);
  }
}
