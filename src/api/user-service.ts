import { Address, CustomerData } from '../types/index';
import getAccessToken from './get-access-token';
import { region } from './const';

export async function getUserInfo(): Promise<CustomerData> {
  const customerId = sessionStorage.getItem('customerID');
  if (!customerId) throw new Error('User not logged in');

  const response = await fetch(
    `https://api.${region}.commercetools.com/${process.env.project_key}/customers/${customerId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  const data = await response.json();
  return data;
}

export async function getUserAddresses(): Promise<Address[]> {
  const userInfo = await getUserInfo();
  return userInfo.addresses;
}
