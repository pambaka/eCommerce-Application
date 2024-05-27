import { CustomerIncomeData } from '../types/index';
import { CUSTOMER_ACCESS_TOKEN, region } from './const';

export default function getUserInfo(): Promise<CustomerIncomeData> {
  const accessToken = localStorage.getItem(CUSTOMER_ACCESS_TOKEN);

  if (!accessToken) {
    return Promise.reject(new Error('No access token available'));
  }

  const url = `https://api.${region}.commercetools.com/${process.env.project_key}/me`;

  return fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Failed to fetch user info: ${response.status} - ${text}`);
        });
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => error);
}
