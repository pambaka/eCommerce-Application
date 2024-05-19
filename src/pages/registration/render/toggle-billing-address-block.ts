import renderBillingAddressBlock from './render-billing-address-block';

export default function toggleBillingAddressBlock(event: Event) {
  if (event.target instanceof HTMLInputElement && event.target.checked) {
    console.log('checked');
    const billingAddressBlock = document.querySelector('.registration__shipping-address');
    if (billingAddressBlock) billingAddressBlock.remove();
  } else {
    renderBillingAddressBlock();
  }
}
