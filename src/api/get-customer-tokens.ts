import { region } from './const';

export default async function getCustomerTokens(email: string, password: string): Promise<string | undefined> {
  let accessToken: string | undefined;

  await fetch(`https://auth.${region}.commercetools.com/oauth/${process.env.project_key}/customers/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${process.env.client_id}:${process.env.secret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=password&username=${email}&password=${password}`,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      accessToken = data.access_token;
    })
    .catch((error) => console.log(error));

  return accessToken;
}
