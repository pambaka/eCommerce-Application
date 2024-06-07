import CustomerUpdater from '../../../api/update-customer';
import showModal from '../../show-modal';
import { ActionPayload } from '../../../types/addresses';

export default async function handleAddressTypeAndDefaultStatus(
  node: HTMLElement,
  index: number,
  addressIdOrKey: string,
): Promise<void> {
  const customerUpdater = new CustomerUpdater();
  const customerData = await customerUpdater.fetchCustomerData();

  if (!customerData) {
    showModal('Failed to fetch customer data', 'Something went wrong...', false);
    return;
  }

  const actions: ActionPayload[] = [];

  const shippingCheckbox = node.querySelector(`#shipping-checkbox-${index}`) as HTMLInputElement;
  const billingCheckbox = node.querySelector(`#billing-checkbox-${index}`) as HTMLInputElement;
  const defaultShippingCheckbox = node.querySelector(`#default-shipping-checkbox-${index}`) as HTMLInputElement;
  const defaultBillingCheckbox = node.querySelector(`#default-billing-checkbox-${index}`) as HTMLInputElement;

  if (shippingCheckbox.checked) {
    actions.push({ action: 'addShippingAddressId', addressId: addressIdOrKey });
  } else if (customerData.shippingAddressIds.includes(addressIdOrKey)) {
    actions.push({ action: 'removeShippingAddressId', addressId: addressIdOrKey });
    if (customerData.defaultShippingAddressId === addressIdOrKey) {
      actions.push({ action: 'setDefaultShippingAddress', addressId: null });
      defaultShippingCheckbox.checked = false;
    }
  }

  if (billingCheckbox.checked) {
    actions.push({ action: 'addBillingAddressId', addressId: addressIdOrKey });
  } else if (customerData.billingAddressIds.includes(addressIdOrKey)) {
    actions.push({ action: 'removeBillingAddressId', addressId: addressIdOrKey });
    if (customerData.defaultBillingAddressId === addressIdOrKey) {
      actions.push({ action: 'setDefaultBillingAddress', addressId: null });
      defaultBillingCheckbox.checked = false;
    }
  }

  if (defaultShippingCheckbox.checked && customerData.defaultShippingAddressId !== addressIdOrKey) {
    actions.push({ action: 'setDefaultShippingAddress', addressId: addressIdOrKey });
  } else if (!defaultShippingCheckbox.checked && customerData.defaultShippingAddressId === addressIdOrKey) {
    actions.push({ action: 'setDefaultShippingAddress', addressId: null });
  }

  if (defaultBillingCheckbox.checked && customerData.defaultBillingAddressId !== addressIdOrKey) {
    actions.push({ action: 'setDefaultBillingAddress', addressId: addressIdOrKey });
  } else if (!defaultBillingCheckbox.checked && customerData.defaultBillingAddressId === addressIdOrKey) {
    actions.push({ action: 'setDefaultBillingAddress', addressId: null });
  }

  if (actions.length === 0) return;

  const requestBody = {
    version: customerData.version,
    actions,
  };

  const success = await customerUpdater.fetchUpdate(requestBody);

  if (success) {
    showModal('Address updated successfully', '', true);
  } else {
    showModal('Failed to update address', 'Something went wrong...', false);
  }
}
