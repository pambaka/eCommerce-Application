import useToken from '../services/use-token';
import { region, oauth } from './const';

export default async function fetchPasswordToken(email: string, password: string): Promise<number> {
  const url = `https://auth.${region}.${oauth}/keep-calm-and-code/customers/token?grant_type=password&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${process.env.client_id}:${process.env.secret}`)}`,
      },
    });

    if (!response.ok) {
      console.error(`Error fetching password token: ${response.status} - ${response.statusText}`);
      return response.status;
    }

    const data = await response.json();
    const refreshToken = data.refresh_token;
    await useToken.customer.refresh.set(refreshToken);
    const accessToken = data.access_token;
    await useToken.customer.access.set(accessToken);
    return response.status;
  } catch (error) {
    return 500;
  }
}
