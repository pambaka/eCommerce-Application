import { region, CUSTOMER_ACCESS_TOKEN } from './const';
import handleErrorMessage from '../pages/handle-error-message';
import useToken from '../services/use-token';

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
      if (data.statusCode === 400) {
        handleErrorMessage(data.message);
      } else {
        accessToken = data.access_token;
        if (accessToken) {
          localStorage.setItem(CUSTOMER_ACCESS_TOKEN, accessToken);
          useToken.customer.access.set(accessToken);
        }
      }
    })
    .catch((error) => error);

  return accessToken;
}
