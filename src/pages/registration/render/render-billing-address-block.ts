import createAddressBlock from './create-address-block';
import { CLASS_NAMES, ID_NAMES } from '../../../const';
import BaseComponent from '../../../components/base-component';
import LabelComponent from '../../../components/label-component';
import InputCheckboxComponent from '../../../components/checkbox-component';

export default function renderBillingAddressBlock() {
  const billingAddressBlock = createAddressBlock(CLASS_NAMES.shippingAddress, 'Billing address');

  const row = new BaseComponent('div', 'row');
  const defaultBillingLabel = new LabelComponent('Set as default billing address', ID_NAMES.defaultBilling);
  const isDefaultBillingAddress = new InputCheckboxComponent(ID_NAMES.defaultBilling);
  defaultBillingLabel.node.classList.add('col-md-6');
  defaultBillingLabel.node.prepend(isDefaultBillingAddress.node);
  row.node.append(defaultBillingLabel.node);
  billingAddressBlock.append(row.node);

  const addressBlock = document.querySelector('.registration__address');
  if (addressBlock) addressBlock.after(billingAddressBlock);
}
