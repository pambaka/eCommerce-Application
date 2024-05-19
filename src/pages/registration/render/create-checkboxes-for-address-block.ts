import BaseComponent from '../../../components/base-component';
import InputCheckboxComponent from '../../../components/checkbox-component';
import LabelComponent from '../../../components/label-component';
import { ID_NAMES } from '../../../const';
import toggleBillingAddressBlock from './toggle-billing-address-block';

export default function checkboxes(): HTMLElement {
  const row = new BaseComponent('div', 'row');
  const defaultLabel = new LabelComponent('Set as default shipping address', ID_NAMES.defaultShipping);
  const isDefaultAddress = new InputCheckboxComponent(ID_NAMES.defaultShipping);
  defaultLabel.node.classList.add('col-md-6');
  defaultLabel.node.prepend(isDefaultAddress.node);

  const useForBilling = new LabelComponent('Also use for billing', ID_NAMES.useForBilling);
  const isUsedForBilling = new InputCheckboxComponent(ID_NAMES.useForBilling);
  useForBilling.node.classList.add('col-md-6');
  useForBilling.node.prepend(isUsedForBilling.node);
  isUsedForBilling.node.checked = true;
  isUsedForBilling.node.addEventListener('click', toggleBillingAddressBlock);

  row.node.append(defaultLabel.node, useForBilling.node);

  return row.node;
}
