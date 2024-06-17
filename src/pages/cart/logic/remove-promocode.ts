import getActiveCart from '../../../api/get-active-cart';
import removePromo from '../../../api/remove-promocode';
import useToken from '../../../services/use-token';
import { Cart, RemovePromoCode } from '../../../types/cart';

export default async function removePromocode(): Promise<Cart | undefined> {
  const token = await useToken.access.get();
  if (!token) return undefined;
  let cart: Cart | undefined = await getActiveCart(token);
  if (!cart) return undefined;

  const idOfPromocode = cart.discountCodes[0].discountCode.id;

  const removePromoCode: RemovePromoCode = {
    action: 'removeDiscountCode',
    discountCode: {
      typeId: 'discount-code',
      id: idOfPromocode,
    },
  };

  cart = await removePromo(cart, removePromoCode, token);

  return cart;
}
