import createCart from '../../../api/create-cart';
import getActiveCart from '../../../api/get-active-cart';
import getProductByKey from '../../../api/get-product-by-key';
import updateCart from '../../../api/update-cart';
import useToken from '../../../services/use-token';
import { Cart } from '../../../types/cart';
import { Product } from '../../../types/products';
import { CARD_BUTTON_TEXT } from '../const';

export default async function addToCart(event: Event): Promise<void> {
  event.stopPropagation();

  const button = event.target;
  if (!(button instanceof HTMLButtonElement)) return;

  let isUpdateSuccessfull = false;

  try {
    button.disabled = true;
    button.textContent = CARD_BUTTON_TEXT.processing;

    const token = await useToken.access.get();
    if (!token) return;

    let activeCart: Cart | undefined = await getActiveCart(token);
    if (!activeCart) {
      activeCart = await createCart(token);
    }

    const card = button.parentElement?.parentElement;
    if (!card) return;

    const key = card.getAttribute('key');
    if (!key) return;

    const product: Product | undefined = await getProductByKey(key, token);

    if (activeCart && product) {
      isUpdateSuccessfull = await updateCart(activeCart, product.id, token);
    }
  } finally {
    if (isUpdateSuccessfull) {
      button.textContent = CARD_BUTTON_TEXT.inTheCart;
    } else {
      button.removeAttribute('disabled');
      button.textContent = CARD_BUTTON_TEXT.addToCart;
    }
  }
}
