import { region, TOKEN_STORAGE_KEY } from './const';

export default async function getAccessTokenForUserInfo(email: string, password: string): Promise<void> {
  const response = await fetch(
    `https://auth.${region}.commercetools.com/oauth/${process.env.project_key}/customers/token`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${process.env.client_id}:${process.env.secret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=password&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
    },
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message || 'Failed to fetch access token');
  }

  const accessToken = data.access_token;
  sessionStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
}
