import { CustomerIncomeData } from '../types/index';
import { region } from './const';
import useToken from '../services/use-token';
import replaceLocation from '../utils/replace-location';
import Router from '../services/router';

export default async function getUserInfo(): Promise<CustomerIncomeData | undefined> {
  const accessToken = useToken.customer.access.get();

  let data: CustomerIncomeData | undefined;

  if (!accessToken) {
    replaceLocation(Router.pages.main);
  } else {
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

      data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch user info: ${error.message}`);
      } else {
        throw new Error('Failed to fetch user info: Unknown error');
      }
    }
  }

  return data;
}
