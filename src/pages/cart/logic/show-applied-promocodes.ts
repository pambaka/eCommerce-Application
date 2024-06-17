import getPromocodeById from '../../../api/get-promocode-by-id';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonComponent from '../../../components/button-component';
import { Cart, Promocode } from '../../../types/cart';
import LANGUAGE from '../../../types/const';
// import showModal from '../../show-modal';
import renderAppliedPromocode from '../render/render-applied-promocode';
import lookForAppliedPromocodes from './look-for-applied-promocodes';
// import removePromocode from './remove-promocode';
import updatePageAfterRemovedPromo from './update-page-after-removed-promo';
// import updateSubtotalPrice from './update-subtotal-price';
// import updateTotalPrice from './update-total-price';

export default function showAppliedPromocodes(token: string, cart: Cart, neighbourElement: HTMLElement) {
  document.querySelector('.applied-promocodes')?.remove();
  const setOfPromocodes = new Set(lookForAppliedPromocodes(cart));
  const promos: Promise<Promocode | undefined>[] = [];
  setOfPromocodes.forEach((promocodeItem) => {
    const resp: Promise<Promocode | undefined> = getPromocodeById(token, promocodeItem);
    promos.push(resp);
  });

  Promise.allSettled(promos).then((data) => {
    if (data.length > 0) {
      const appliedPromoWrapper = new BaseTextComponent('div', 'applied-promocodes', 'Applied:');

      neighbourElement.insertAdjacentElement('beforebegin', appliedPromoWrapper.node);

      data.forEach((element) => {
        if (element.status === 'fulfilled' && element.value) {
          renderAppliedPromocode(element.value.name[LANGUAGE], appliedPromoWrapper.node);
        }
      });

      const lastPromoNode = document.querySelector('.applied-promo-wrapper:last-child');
      if (!lastPromoNode) return;
      const removeButton = new ButtonComponent(
        'remove-promo-button',
        async (event) => {
          updatePageAfterRemovedPromo(event, data);
        },
        '',
        false,
      );

      removeButton.node.ariaLabel = 'Close';
      removeButton.node.setAttribute('title', 'Remove apllied');
      lastPromoNode.append(removeButton.node);
    }
  });
}
