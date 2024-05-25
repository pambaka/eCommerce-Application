import { CustomerIncomeData } from '../types/index';
import { region, TOKEN_STORAGE_KEY } from './const';

export default async function getUserInfo(): Promise<CustomerIncomeData> {
  const customerAccessToken = sessionStorage.getItem(TOKEN_STORAGE_KEY);

  if (!customerAccessToken) {
    throw new Error('No access token available');
  }

  const response = await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${customerAccessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user info: ${response.status} - ${await response.text()}`);
  }

  const data = await response.json();
  return data;
}
