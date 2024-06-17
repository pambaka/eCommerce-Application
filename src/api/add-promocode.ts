import showModal from '../pages/show-modal';
import { Cart, AddPromoCode } from '../types/cart';
import { region } from './const';

export default async function addPromo(
  cart: Cart,
  addPromoCode: AddPromoCode,
  token: string,
): Promise<Cart | undefined> {
  let updatedCart: Cart | undefined;

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
          action: addPromoCode.action,
          code: addPromoCode.code,
        },
      ],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.statusCode === 400) {
        showModal(data.message, 'Use capital letters and check for\xa0typos');
        return;
      }
      updatedCart = data;
    })
    .catch((error) => {
      console.log(error);
    });

  return updatedCart;
}