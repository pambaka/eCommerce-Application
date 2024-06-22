import showModal from '../pages/show-modal';
import { Successful } from '../types';
import { Cart } from '../types/cart';
import { region } from './const';

export default async function deleteCart(
  accessToken: string,
  cartId: string,
  cartVersion: string,
): Promise<Cart | undefined> {
  let cart: Cart | undefined;
  await fetch(
    `https://api.${region}.commercetools.com/${process.env.project_key}/carts/${cartId}?version=${cartVersion}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
    .then((res) => {
      if (res.status !== Successful.ok) {
        showModal('Something went wrong', 'Please keep calm and try again');
      }
      return res.json();
    })
    .then((data) => {
      cart = data;
    })
    .catch((error) => {
      console.log(error);
    });
  return cart;
}
