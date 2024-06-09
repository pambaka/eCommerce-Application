import { Cart } from '../types/cart';
import { region } from './const';

export default async function updateCart(cart: Cart, productId: string, token: string): Promise<boolean> {
  let isUpdateSuccessfull = false;

  await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/me/carts/${cart.id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version: cart.version,
      actions: [
        {
          action: 'addLineItem',
          productId,
          variantId: 1,
          quantity: 1,
        },
      ],
    }),
  })
    .then((res) => {
      console.log(res, res.status);
      if (res.status === 200) isUpdateSuccessfull = true;

      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });

  return isUpdateSuccessfull;
}
