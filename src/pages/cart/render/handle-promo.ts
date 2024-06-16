import addPromo from '../../../api/add-promocode';
import getActiveCart from '../../../api/get-active-cart';
import useToken from '../../../services/use-token';
import { AddPromoCode, Cart } from '../../../types/cart';
import showAppliedPromocodes from '../logic/show-applied-promocodes';
import updateSubtotalPrice from '../logic/update-subtotal-price';
import updateTotalPrice from '../logic/update-total-price';

export default async function handlePromo() {
  const promoInput = document.querySelector('.promo-input');
  const promoBtn = document.querySelector('.promo-btn');
  const token = await useToken.access.get();
  if (promoBtn && promoInput instanceof HTMLInputElement && token) {
    const promocode = promoInput.value;
    const activeCart: Cart | undefined = await getActiveCart(token);
    if (!activeCart) return;

    const addPromoCode: AddPromoCode = {
      action: 'addDiscountCode',
      code: promocode,
    };

    const updatedCart: Cart | undefined = await addPromo(activeCart, addPromoCode, token);
    console.log('updatedCart: ', updatedCart);
    if (updatedCart) {
      console.log('updatedCart: ', updatedCart);
      const productNodes = document.querySelectorAll<HTMLElement>('.cart__product');
      Array.from(productNodes).forEach((element, index) => {
        updateSubtotalPrice(element, updatedCart.lineItems[index], updatedCart.lineItems[index].quantity, updatedCart);
      });
      updateTotalPrice(updatedCart);

      const inputField = document.querySelector('.promo-input');
      if (inputField instanceof HTMLInputElement) {
        inputField.value = '';
        inputField.dispatchEvent(new KeyboardEvent('keyup', { key: 'Backspace' }));
      }

      const totalPriceWrapper = document.querySelector<HTMLElement>('.total-wrapper');

      if (totalPriceWrapper) {
        showAppliedPromocodes(token, updatedCart, totalPriceWrapper);
      }
    }
  }
}
