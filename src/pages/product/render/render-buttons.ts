import getActiveCart from '../../../api/get-active-cart';
import BaseComponent from '../../../components/base-component';
import { CLASS_NAMES } from '../../../const';
import CardCartButton from '../../../modules/card-cart-button/card-cart-button';
import useToken from '../../../services/use-token';
import addToCart from '../../add-to-cart';
import { CARD_BUTTON_TEXT } from '../../const';
import removeFromCart from '../logic/remove-from-cart';

export default async function renderButtons(parentElement: HTMLElement, productId: string): Promise<void> {
  let isDisabled: boolean = false;
  let buttonText: string = CARD_BUTTON_TEXT.addToCart;

  const buttons = new BaseComponent('div', 'add-remove-buttons');

  const token = await useToken.access.get();

  if (token) {
    const cart = await getActiveCart(token);
    if (cart) {
      isDisabled = cart.lineItems.some((product) => product.productId === productId);
      if (isDisabled) buttonText = CARD_BUTTON_TEXT.inTheCart;
    }
  }

  const addButton = new CardCartButton(CLASS_NAMES.addToCartButton, addToCart, buttonText, isDisabled);

  const removeButton = new CardCartButton(
    CLASS_NAMES.removeFromCartButton,
    removeFromCart.bind(productId),
    CARD_BUTTON_TEXT.removeFromCart,
    !isDisabled,
  );

  buttons.node.append(addButton.node, removeButton.node);
  parentElement.append(buttons.node);
}
