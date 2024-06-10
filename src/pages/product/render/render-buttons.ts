import getActiveCart from '../../../api/get-active-cart';
import ButtonComponent from '../../../components/button-component';
import useToken from '../../../services/use-token';
import addToCart from '../../add-to-cart';
import { CARD_BUTTON_TEXT } from '../../const';

export default async function renderButtons(parentElement: HTMLElement, productId: string): Promise<void> {
  let isDisabled: boolean = false;

  const token = await useToken.access.get();

  if (token) {
    const cart = await getActiveCart(token);
    if (cart) {
      isDisabled = cart.lineItems.some((product) => product.productId === productId);
    }
  }

  const addButton = new ButtonComponent('add-to-cart-button', addToCart, CARD_BUTTON_TEXT.addToCart, isDisabled);
  parentElement.append(addButton.node);
}
