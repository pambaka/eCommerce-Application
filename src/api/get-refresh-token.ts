import { region } from './const';

export default async function getRefreshToken(refreshToken: string): Promise<string | undefined> {
  const url = `https://auth.${region}/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.client_id}:${process.env.secret}`)}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  return data.access_token;
}
