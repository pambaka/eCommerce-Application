import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonComponent from '../../../components/button-component';
import InputComponent from '../../../components/input-component';
import checkPromo from '../logic/check-promo';
import handlePromo from './handle-promo';

export default function renderPromo(parentElement: HTMLElement) {
  const promoWrapper = new BaseComponent('div', 'promo-wrapper');
  const promoTitle = new BaseTextComponent('p', 'promo-title', 'Promocode');
  // const promoInput = new BaseComponent<HTMLInputElement>('input', 'promo-input');
  // promoInput.node.type = 'text';
  const promoInput = new InputComponent('promo-input', 'text', checkPromo);

  const promoBtn = new ButtonComponent('promo-btn', handlePromo, 'Apply', true);
  // promoBtn.node.classList.add('card-cart-button');

  promoWrapper.node.append(promoTitle.node, promoInput.node, promoBtn.node);
  parentElement.append(promoWrapper.node);
}
