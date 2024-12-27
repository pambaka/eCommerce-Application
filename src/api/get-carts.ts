import showModal from '../pages/show-modal';
import { ClientErrors, Successful } from '../types';
import { Cart } from '../types/cart';
import { region } from './const';

export default async function getCarts(token: string): Promise<Cart[]> {
  let cart: Cart[] = [];

  await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/me/carts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status !== Successful.ok) {
        if (res.status === ClientErrors.unauthorized || res.status === ClientErrors.forbidden) {
          showModal('Something went wrong', 'Please reload the page and try again');
        }

        return undefined;
      }

      return res.json();
    })
    .then((data) => {
      if (data.results) cart = data.results;
    })
    .catch((error) => error);

  return cart;
}
