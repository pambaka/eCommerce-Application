import showModal from '../pages/show-modal';
import { Cart } from '../types/cart';
import { region } from './const';

export default async function getActiveCart(token: string): Promise<Cart | undefined> {
  let cart: Cart | undefined;

  await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/me/active-cart`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 401 || res.status === 403) {
        showModal('Something went wrong', 'Please reload the page and try again');
      }
      if (res.status !== 200) return undefined;
      return res.json();
    })
    .then((data) => {
      if (data) cart = data;
    })
    .catch((error) => console.log(error));

  return cart;
}
