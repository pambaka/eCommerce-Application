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
      console.log(res);

      if (res.status !== 200) return undefined;
      return res.json();
    })
    .then((data) => {
      console.log(data);

      if (data) cart = data;
    })
    .catch((error) => console.log(error));

  return cart;
}
