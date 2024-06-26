import { region } from './const';
import handleErrorMessage from '../pages/handle-error-message';
import useToken from '../services/use-token';
import { ClientErrors } from '../types';

export default async function getCustomerTokens(email: string, password: string): Promise<string | undefined> {
  let accessToken: string | undefined;
  let refreshToken: string | undefined;

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
      if (data.statusCode === ClientErrors.badRequest) {
        handleErrorMessage(data.message);
      } else {
        accessToken = data.access_token;
        refreshToken = data.refresh_token;
        if (accessToken) {
          useToken.customer.access.set(accessToken);
        }
        if (refreshToken) {
          useToken.customer.refresh.set(refreshToken);
        }
      }
    })
    .catch((error) => error);

  return accessToken;
}
