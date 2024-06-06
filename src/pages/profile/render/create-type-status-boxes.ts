import BaseComponent from '../../../components/base-component';
import InputCheckboxComponent from '../../../components/checkbox-component';

export function createShippingCheckbox(
  isShippingChecked: boolean,
  index: number,
  onChange: (isChecked: boolean) => void,
): HTMLElement {
  const shippingCheckboxWrapper = new BaseComponent('div', 'profile_page__address_title_wrapper');
  const shippingCheckbox = new InputCheckboxComponent(`shipping-checkbox-${index}`);
  shippingCheckbox.node.checked = isShippingChecked;

  const shippingLabel = new BaseComponent('label', 'profile_page__address_label');
  shippingLabel.node.textContent = 'Shipping Address : ';
  shippingLabel.node.setAttribute('for', `shipping-checkbox-${index}`);

  shippingCheckbox.node.addEventListener('change', () => {
    onChange(shippingCheckbox.node.checked);
  });

  shippingCheckboxWrapper.node.append(shippingLabel.node, shippingCheckbox.node);
  return shippingCheckboxWrapper.node;
}

export function createBillingCheckbox(
  isBillingChecked: boolean,
  index: number,
  onChange: (isChecked: boolean) => void,
): HTMLElement {
  const billingCheckboxWrapper = new BaseComponent('div', 'profile_page__address_title_wrapper');
  const billingCheckbox = new InputCheckboxComponent(`billing-checkbox-${index}`);
  billingCheckbox.node.checked = isBillingChecked;

  const billingLabel = new BaseComponent('label', 'profile_page__address_label');
  billingLabel.node.textContent = 'Billing Address: ';
  billingLabel.node.setAttribute('for', `billing-checkbox-${index}`);

  billingCheckbox.node.addEventListener('change', () => {
    onChange(billingCheckbox.node.checked);
  });

  billingCheckboxWrapper.node.append(billingLabel.node, billingCheckbox.node);
  return billingCheckboxWrapper.node;
}

export function createDefaultShippingCheckbox(
  isDefaultShippingChecked: boolean,
  index: number,
  onChange: (isChecked: boolean) => void,
): HTMLElement {
  const defaultShippingCheckboxWrapper = new BaseComponent('div', 'profile_page__address_title_wrapper');
  const defaultShippingCheckbox = new InputCheckboxComponent(`default-shipping-checkbox-${index}`);
  defaultShippingCheckbox.node.checked = isDefaultShippingChecked;

  const defaultShippingLabel = new BaseComponent('label', 'profile_page__address_label');
  defaultShippingLabel.node.textContent = 'Default Shipping: ';
  defaultShippingLabel.node.setAttribute('for', `default-shipping-checkbox-${index}`);

  defaultShippingCheckbox.node.addEventListener('change', () => {
    onChange(defaultShippingCheckbox.node.checked);
  });

  defaultShippingCheckboxWrapper.node.append(defaultShippingLabel.node, defaultShippingCheckbox.node);
  return defaultShippingCheckboxWrapper.node;
}

export function createDefaultBillingCheckbox(
  isDefaultBillingChecked: boolean,
  index: number,
  onChange: (isChecked: boolean) => void,
): HTMLElement {
  const defaultBillingCheckboxWrapper = new BaseComponent('div', 'profile_page__address_title_wrapper');
  const defaultBillingCheckbox = new InputCheckboxComponent(`default-billing-checkbox-${index}`);
  defaultBillingCheckbox.node.checked = isDefaultBillingChecked;

  const defaultBillingLabel = new BaseComponent('label', 'profile_page__address_label');
  defaultBillingLabel.node.textContent = 'Default Billing: ';
  defaultBillingLabel.node.setAttribute('for', `default-billing-checkbox-${index}`);

  defaultBillingCheckbox.node.addEventListener('change', () => {
    onChange(defaultBillingCheckbox.node.checked);
  });

  defaultBillingCheckboxWrapper.node.append(defaultBillingLabel.node, defaultBillingCheckbox.node);
  return defaultBillingCheckboxWrapper.node;
}
