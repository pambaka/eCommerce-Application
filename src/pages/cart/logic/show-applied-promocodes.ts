import getPromocodeById from '../../../api/get-promocode-by-id';
import BaseTextComponent from '../../../components/base-text-component';
import { Cart, Promocode } from '../../../types/cart';
import LANGUAGE from '../../../types/const';
import renderAppliedPromocode from '../render/render-applied-promocode';
import lookForAppliedPromocodes from './look-for-applied-promocodes';

export default function showAppliedPromocodes(token: string, cart: Cart, neighbourElement: HTMLElement) {
  if (document.querySelector('.applied-promocodes')) {
    document.querySelector('.applied-promocodes')?.remove();
  }
  const setOfPromocodes = new Set(lookForAppliedPromocodes(cart));
  console.log('setOfPromocodes: ', setOfPromocodes);
  const promos: Promise<Promocode | undefined>[] = [];
  setOfPromocodes.forEach((promocodeItem) => {
    const resp: Promise<Promocode | undefined> = getPromocodeById(token, promocodeItem);
    promos.push(resp);
    console.log('promos: ', promos);
  });

  Promise.allSettled(promos).then((data) => {
    console.log('data: ', data);
    if (data.length > 0) {
      const appliedPromoWrapper = new BaseTextComponent('div', 'applied-promocodes', 'Applied:');

      neighbourElement.insertAdjacentElement('beforebegin', appliedPromoWrapper.node);

      data.forEach((element) => {
        if (element.status === 'fulfilled' && element.value) {
          console.log(element.value.name);
          renderAppliedPromocode(element.value.name[LANGUAGE], appliedPromoWrapper.node);
        }
      });
    }
  });
}
