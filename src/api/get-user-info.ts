import { CustomerIncomeData } from '../types/index';
import apiDataAdmin from './apiData';
import { TOKEN_STORAGE_KEY } from './const';

export default function getUserInfo(): Promise<CustomerIncomeData> {
  const accessToken = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!accessToken) {
    return Promise.reject(new Error('No access token available'));
  }

  const url = `${apiDataAdmin.API_URL}/${apiDataAdmin.PROJECT_KEY}/me`;

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
