import addPromo from '../../../api/add-promocode';
import getActiveCart from '../../../api/get-active-cart';
import useToken from '../../../services/use-token';
import { AddPromoCode, Cart } from '../../../types/cart';
import showModal from '../../show-modal';
import showAppliedPromocodes from '../logic/show-applied-promocodes';
import updateSubtotalPrice from '../logic/update-subtotal-price';
import updateTotalPrice from '../logic/update-total-price';

export default async function handlePromo() {
  const promoInput = document.querySelector('.promo-input');
  const promoBtn = document.querySelector('.promo-btn');
  const token = await useToken.access.get();
  if (promoBtn && promoInput instanceof HTMLInputElement && token) {
    const promocode = promoInput.value;

    let promocodeIsUsed: boolean = false;

    const appliedPromos = document.querySelectorAll('.promo-text');
    appliedPromos.forEach((element) => {
      if (element.innerHTML === promocode) {
        showModal(`${promocode} promocode is already active`, '', true);
        promocodeIsUsed = true;
        promoInput.value = '';
      }
    });

    if (promocodeIsUsed) return;

    const activeCart: Cart | undefined = await getActiveCart(token);
    if (!activeCart) return;

    const addPromoCode: AddPromoCode = {
      action: 'addDiscountCode',
      code: promocode,
    };

    const updatedCart: Cart | undefined = await addPromo(activeCart, addPromoCode, token);
    if (updatedCart) {
      const productNodes = document.querySelectorAll<HTMLElement>('.cart__product');
      Array.from(productNodes).forEach((element, index) => {
        updateSubtotalPrice(element, updatedCart.lineItems[index], updatedCart.lineItems[index].quantity, updatedCart);
      });
      updateTotalPrice(updatedCart);

      promoInput.value = '';
      promoInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Backspace' }));

      const totalPriceWrapper = document.querySelector<HTMLElement>('.total-wrapper');

      if (totalPriceWrapper) {
        showAppliedPromocodes(token, updatedCart, totalPriceWrapper);
      }
    }
  }
}
