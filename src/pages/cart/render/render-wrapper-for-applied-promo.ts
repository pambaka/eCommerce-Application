import BaseComponent from '../../../components/base-component';

export default function renderWrapperForAppliedPromo() {
  const totalPriceWrapper = document.querySelector<HTMLElement>('.total-wrapper');
  const cartWrapper = document.querySelector<HTMLElement>('.cart-wrapper');
  if (totalPriceWrapper && cartWrapper) {
    const appliedPromoWrapper = new BaseComponent('div', 'applied-promocodes');

    totalPriceWrapper.insertAdjacentElement('beforebegin', appliedPromoWrapper.node);
  }
}
