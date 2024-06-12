import getActiveCart from '../../../api/get-active-cart';
import updateCart from '../../../api/update-cart';
import useToken from '../../../services/use-token';
import { Cart, CartProduct, UpdateCartData } from '../../../types/cart';
import updatePrices from './update-prices';

export default async function handleQuantityChange(event: Event, cartItem: CartProduct) {
  const inputField = event.currentTarget;
  const token = await useToken.access.get();
  if (inputField instanceof HTMLInputElement && token) {
    const activeCart: Cart | undefined = await getActiveCart(token);
    if (!activeCart) return;

    const updateCartData: UpdateCartData = {
      action: 'changeLineItemQuantity',
      quantity: Number(inputField.value),
      lineItemId: cartItem.id,
    };

    const updatedCart: Cart | undefined = await updateCart(activeCart, cartItem.productId, updateCartData, token);

    const cartProductNode = inputField.closest('.cart__product');
    if (updatedCart && cartProductNode instanceof HTMLElement) {
      updatePrices(
        cartProductNode,
        cartItem.variant.prices[0].value.centAmount,
        Number(inputField.value),
        updatedCart.totalPrice.centAmount,
      );
    }
  }
}
