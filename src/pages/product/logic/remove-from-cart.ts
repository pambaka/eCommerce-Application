import getActiveCart from '../../../api/get-active-cart';
import updateCart from '../../../api/update-cart';
import { CLASS_NAMES } from '../../../const';
import useToken from '../../../services/use-token';
import { CARD_BUTTON_TEXT, MESSAGES } from '../../const';
import showModal from '../../show-modal';

export default async function removeFromCart(this: string) {
  let isRemovalSuccessfull: boolean = false;

  const removeButton = document.querySelector(`.${CLASS_NAMES.removeFromCartButton}`);
  if (removeButton instanceof HTMLButtonElement) {
    removeButton.disabled = true;
    removeButton.textContent = CARD_BUTTON_TEXT.processing;

    try {
      const token = await useToken.access.get();
      if (!token) {
        showModal(MESSAGES.error.updateCart, MESSAGES.suggestion.reloadAndTryAgain);
        return;
      }

      const activeCart = await getActiveCart(token);
      if (activeCart) {
        const lineItem = activeCart.lineItems.find((item) => item.productId === this);
        if (lineItem) {
          isRemovalSuccessfull = await updateCart(
            activeCart,
            this,
            { action: 'changeLineItemQuantity', quantity: 0, lineItemId: lineItem.id },
            token,
          );
        } else isRemovalSuccessfull = true;
      } else showModal(MESSAGES.error.updateCart, MESSAGES.suggestion.reloadAndTryAgain);
    } finally {
      const addButton = document.querySelector(`.${CLASS_NAMES.addToCartButton}`);

      if (isRemovalSuccessfull && addButton instanceof HTMLButtonElement) {
        addButton.disabled = false;
        addButton.textContent = CARD_BUTTON_TEXT.addToCart;
      } else {
        removeButton.disabled = false;
      }
      removeButton.textContent = CARD_BUTTON_TEXT.removeFromCart;
    }
  }
}
