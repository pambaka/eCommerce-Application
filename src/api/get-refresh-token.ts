import { region, oauth } from './const';
import showModal from '../pages/show-modal';

export default async function fetchRefreshToken(refreshToken: string): Promise<string | undefined> {
  const url = `https://auth.${region}.${oauth}/token?grant_type=refresh_token&refresh_token=${refreshToken}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.client_id}:${process.env.secret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  const data = await response.json();
  const accessToken = data.access_token;
  if (accessToken) {
    return accessToken;
  }
  showModal('Something went wrong', 'Please try again');
  return undefined;
}
