import { CustomerIncomeData } from '../types/index';
import { region } from './const';
import useToken from '../services/use-token';

export default function getUserInfo(): Promise<CustomerIncomeData> {
  const accessToken = useToken.customer.access.get();

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
