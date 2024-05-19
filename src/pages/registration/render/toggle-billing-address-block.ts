import { CLASS_NAMES, DOM } from '../../../const';
import assertNonNullable from '../../../utils/assert-non-nullable';
import renderBillingAddressBlock from './render-billing-address-block';

export default function toggleBillingAddressBlock(event: Event) {
  const regSubmitButton = DOM.elements[CLASS_NAMES.registrationButton];
  if (event.target instanceof HTMLInputElement && event.target.checked) {
    const billingAddressBlock = document.querySelector(`.${CLASS_NAMES.shippingAddress}`);

    if (billingAddressBlock) billingAddressBlock.remove();
    regSubmitButton.removeAttribute('disabled');
    const keyUpEvent = new KeyboardEvent('keyup');
    const emailInput = assertNonNullable<HTMLInputElement>(`.${CLASS_NAMES.emailInput}`);
    emailInput.dispatchEvent(keyUpEvent);
  } else {
    renderBillingAddressBlock();
    regSubmitButton.setAttribute('disabled', 'true');
  }
}
