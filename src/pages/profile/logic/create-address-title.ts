import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import createEditableField from '../render/editable-field/create-editable-field';
import makeFieldEditableWithSelect from '../render/editable-field/make-field-editable-with-select';
import { CLASS_NAMES } from '../../../const';

export default function createAddressTitle(
  addressTitleText: string,
  index: number,
  addressTitleOptions: { label: string; value: string }[],
  onTitleChange: (newValue: string) => void,
): HTMLElement {
  let localAddressTitleText = addressTitleText;

  const addressTitle = new BaseComponent('h3', 'profile_page__address_title');
  addressTitle.node.textContent = localAddressTitleText;
  const defaultLabel = new BaseTextComponent('span', 'profile_page__default_label', '');
  addressTitle.node.appendChild(defaultLabel.node);

  const addressTitleWrapper = createEditableField(
    'Address Type:',
    localAddressTitleText,
    `address-title-${index}`,
    (event) => {
      const target = event.currentTarget as HTMLElement;
      makeFieldEditableWithSelect(
        target.parentNode as HTMLElement,
        'Address Type:',
        localAddressTitleText,
        `address-title-${index}`,
        addressTitleOptions,
        (newValue) => {
          localAddressTitleText = newValue;
          addressTitle.node.firstChild!.textContent = newValue;
          onTitleChange(newValue);
        },
        CLASS_NAMES.profileEditableField,
        CLASS_NAMES.profileInput,
      );
    },
    CLASS_NAMES.profileEditableField,
    CLASS_NAMES.profileInput,
  );

  return addressTitleWrapper;
}
