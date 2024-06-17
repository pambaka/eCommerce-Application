import showModal from '../pages/show-modal';
import { Cart, RemovePromoCode } from '../types/cart';
import { region } from './const';

export default async function removePromo(
  cart: Cart,
  removePromoCode: RemovePromoCode,
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
          action: removePromoCode.action,
          discountCode: {
            typeId: removePromoCode.discountCode.typeId,
            id: removePromoCode.discountCode.id,
          },
        },
      ],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.statusCode === 400) {
        showModal(data.message, '');
        return;
      }
      updatedCart = data;
    })
    .catch((error) => error);

  return updatedCart;
}
