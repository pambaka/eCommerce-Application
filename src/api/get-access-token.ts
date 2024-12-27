import { oauth, region } from './const';

export default async function getAccessToken(): Promise<string | undefined> {
  let accessToken: string | undefined;
  await fetch(`https://auth.${region}.${oauth}/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.client_id}:${process.env.secret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
    .then((resp: Response) => resp.json())
    .then((data) => {
      accessToken = data.access_token;
    })
    .catch((error) => error);
  return accessToken;
}
