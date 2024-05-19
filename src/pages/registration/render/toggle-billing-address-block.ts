import { CLASS_NAMES, DOM } from '../../../const';
import assertNonNullable from '../../../utils/assert-non-nullable';
import renderBillingAddressBlock from './render-billing-address-block';

export default function toggleBillingAddressBlock(event: Event) {
  const regSubmitButton = DOM.elements[CLASS_NAMES.registrationButton];
  if (event.target instanceof HTMLInputElement && event.target.checked) {
    console.log('checked');
    const billingAddressBlock = document.querySelector('.registration__shipping-address');
    if (billingAddressBlock) billingAddressBlock.remove();
    regSubmitButton.removeAttribute('disabled');
    const keyUpEvent = new KeyboardEvent('keyup');
    const nameInput = assertNonNullable<HTMLInputElement>('.registration__first-name');
    nameInput.dispatchEvent(keyUpEvent);
  } else {
    renderBillingAddressBlock();
    regSubmitButton.setAttribute('disabled', 'true');
  }
}
