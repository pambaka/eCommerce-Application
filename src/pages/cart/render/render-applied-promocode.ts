import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';

export default function renderAppliedPromocode(promocode: string, parentElement: HTMLElement) {
  const promoWrapper = new BaseComponent('div', 'applied-promo-wrapper');
  const promoText = new BaseTextComponent('div', 'promo-text', `${promocode}`);

  promoWrapper.node.append(promoText.node);

  parentElement.append(promoWrapper.node);
}
