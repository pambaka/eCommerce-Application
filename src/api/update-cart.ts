import { MESSAGES } from '../pages/const';
import showModal from '../pages/show-modal';
import Counter from '../services/counter';
import { ClientErrors, Successful } from '../types';
import { Cart, UpdateCartData } from '../types/cart';
import { region } from './const';

export default async function updateCart(
  cart: Cart,
  productId: string,
  updateCartData: UpdateCartData,
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
          action: updateCartData.action,
          productId,
          variantId: 1,
          quantity: updateCartData.quantity,
          lineItemId: updateCartData.lineItemId,
        },
      ],
    }),
  })
    .then((res) => {
      if (res.status !== Successful.ok) {
        let suggestion: string = MESSAGES.suggestion.reloadAndTryAgain;
        if (res.status === ClientErrors.conflict) {
          suggestion = MESSAGES.suggestion.wait;
        }

        showModal(MESSAGES.error.updateCart, suggestion);

        return undefined;
      }

      return res.json();
    })
    .then((data) => {
      if (data) {
        updatedCart = data;
        Counter.update(false, data);
      }
    })
    .catch((error) => error);

  return updatedCart;
}
