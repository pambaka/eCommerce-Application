import { Cart } from '../types/cart';
import { region } from './const';

export default async function createCart(token: string): Promise<Cart | undefined> {
  let cart: Cart | undefined;

  await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/me/carts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ currency: 'EUR' }),
  })
    .then((res) => {
      console.log(res);

      if (res.status !== 201) return undefined;

      return res.json();
    })
    .then((data) => {
      console.log(data);

      if (data) cart = data;
    })
    .catch((error) => {
      console.log(error);
    });

  return cart;
}