import { Cart, Promocode } from '../../../types/cart';
import showModal from '../../show-modal';
import removePromocode from './remove-promocode';
import updateSubtotalPrice from './update-subtotal-price';
import updateTotalPrice from './update-total-price';

export default async function updatePageAfterRemovedPromo(
  event: Event,
  data: PromiseSettledResult<Promocode | undefined>[],
) {
  if (data.length > 0) {
    let updatedCart: Cart | undefined = await removePromocode();

    if (data.length === 2) {
      updatedCart = await removePromocode();
    }

    if (!updatedCart) {
      showModal('Something went wrong when deleting promocode', 'Please keep clam and try again');
      return;
    }

    updateTotalPrice(updatedCart);

    const productNodes = document.querySelectorAll<HTMLElement>('.cart__product');
    Array.from(productNodes).forEach((element, nodeIndex) => {
      updateSubtotalPrice(
        element,
        updatedCart.lineItems[nodeIndex],
        updatedCart.lineItems[nodeIndex].quantity,
        updatedCart,
      );
    });

    if (updatedCart && event.target instanceof HTMLElement) {
      event.target.parentElement?.parentElement?.remove();
    }
  }
}
