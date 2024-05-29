import { CustomerIncomeData } from '../types/index';
import { region } from './const';
import useToken from '../services/use-token';

export default async function getUserInfo(): Promise<CustomerIncomeData> {
  const accessToken = useToken.customer.access.get();

  if (!accessToken) {
    return Promise.reject(new Error('No access token available'));
  }

  const url = `https://api.${region}.commercetools.com/${process.env.project_key}/me`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to fetch user info: ${response.status} - ${text}`);
    }

    const data: CustomerIncomeData = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch user info: ${error.message}`);
    } else {
      throw new Error('Failed to fetch user info: Unknown error');
    }
  }
}
