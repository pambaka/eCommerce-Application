import { region } from './const';

export default function getRefreshToken(refreshToken: string): Promise<string | undefined> {
  const url = `https://auth.${region}/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.client_id}:${process.env.secret}`)}`,
    },
  })
    .then((response) => response.json())
    .then((data) => data.access_token)
    .catch(() => undefined);
}
