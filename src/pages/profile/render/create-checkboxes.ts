import BaseComponent from '../../../components/base-component';

function createCheckbox(
  className: string,
  initialChecked: boolean,
  index: number,
  onChange: (isChecked: boolean) => void,
  idPrefix: string,
): HTMLInputElement {
  const checkbox = new BaseComponent('input', className);
  const inputElement = checkbox.node as HTMLInputElement;
  inputElement.type = 'checkbox';
  inputElement.checked = initialChecked;
  inputElement.id = `${idPrefix}-${index}`;
  inputElement.addEventListener('change', () => onChange(inputElement.checked));
  return inputElement;
}

export function createShippingCheckbox(
  initialChecked: boolean,
  index: number,
  onChange: (isChecked: boolean) => void,
): HTMLInputElement {
  return createCheckbox('shipping-checkbox', initialChecked, index, onChange, 'shipping-checkbox');
}

export function createBillingCheckbox(
  initialChecked: boolean,
  index: number,
  onChange: (isChecked: boolean) => void,
): HTMLInputElement {
  return createCheckbox('billing-checkbox', initialChecked, index, onChange, 'billing-checkbox');
}

export function createDefaultShippingCheckbox(
  initialChecked: boolean,
  index: number,
  onChange: (isChecked: boolean) => void,
): HTMLInputElement {
  return createCheckbox('default-shipping-checkbox', initialChecked, index, onChange, 'default-shipping-checkbox');
}

export function createDefaultBillingCheckbox(
  initialChecked: boolean,
  index: number,
  onChange: (isChecked: boolean) => void,
): HTMLInputElement {
  return createCheckbox('default-billing-checkbox', initialChecked, index, onChange, 'default-billing-checkbox');
}
