import { CustomerIncomeData } from '../types/index';
import { region } from './const';
import useToken from '../services/use-token';
import replaceLocation from '../utils/replace-location';
import Router from '../services/router';
import Customer from '../utils/customer';
import showModal from '../pages/show-modal';
import isTokenActive from './is-token-active';

// export default function getUserInfo(): Promise<CustomerIncomeData | undefined> {
//   const accessToken = useToken.customer.access.get();

//   if (!accessToken) {
//     replaceLocation(Router.pages.main);
//     return Promise.resolve(undefined);
//   }

//   const url = `https://api.${region}.commercetools.com/${process.env.project_key}/me`;

//   return fetch(url, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   })
//     .then((response) => {
//       if (response.status === 401) {
//         replaceLocation(Router.pages.main);
//         Customer.logOut();
//         return undefined;
//       }

//       if (!response.ok) {
//         showModal('Something went wrong!', '');
//         return undefined;
//       }

//       return response.json();
//     })
//     .catch((error) => error);
// }

export default async function getUserInfo(): Promise<CustomerIncomeData | undefined> {
  let accessToken = useToken.customer.access.get();

  if (!accessToken) {
    replaceLocation(Router.pages.main);
    return undefined;
  }

  const isActive = await isTokenActive(accessToken);
  if (!isActive) {
    const refreshToken = useToken.customer.refresh.get();
    if (refreshToken) {
      await useToken.fetchRefreshToken(refreshToken);
      accessToken = useToken.customer.access.get();
    } else {
      replaceLocation(Router.pages.main);
      Customer.logOut();
      return undefined;
    }
  }

  const url = `https://api.${region}.commercetools.com/${process.env.project_key}/me`;

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (response.status === 401) {
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
