import isActiveCartExist from './is-active-cart-exist';
import showModal from '../pages/show-modal';
import { ClientErrors, Successful } from '../types';
import { Cart } from '../types/cart';
import { region } from './const';

export default async function getActiveCart(token: string): Promise<Cart | undefined> {
  let cart: Cart | undefined;

  if (!(await isActiveCartExist(token))) return undefined;

  await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/me/active-cart`, {
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
      if (data) cart = data;
    })
    .catch((error) => error);

  return cart;
}
