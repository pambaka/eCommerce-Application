import { ClientErrors, CustomerIncomeData } from '../types/index';
import { region } from './const';
import useToken from '../services/use-token';
import replaceLocation from '../utils/replace-location';
import Router from '../services/router';
import Customer from '../services/customer';
import showModal from '../pages/show-modal';

export default function getUserInfo(): Promise<CustomerIncomeData | undefined> {
  const accessToken = useToken.customer.access.get();

  if (!accessToken) {
    replaceLocation(Router.pages.main);
    return Promise.resolve(undefined);
  }

  const url = `https://api.${region}.commercetools.com/${process.env.project_key}/me`;

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (response.status === ClientErrors.unauthorized) {
        replaceLocation(Router.pages.main);
        Customer.logOut();
        return undefined;
      }

      if (!response.ok) {
        showModal('Something went wrong!', '');
        return undefined;
      }

      return response.json();
    })
    .catch((error) => error);
}
