import BaseTextComponent from '../../../components/base-text-component';
import createEditableField from '../render/editable-field/create-editable-field';
import makeFieldEditableWithSelect from '../render/editable-field/make-field-editable-with-select';
import { CLASS_NAMES } from '../../../const';

export default function createDefaultStatus(
  defaultStatus: string,
  index: number,
  defaultOptions: { label: string; value: string }[],
  onStatusChange: (newValue: string) => void,
): HTMLElement {
  const defaultLabel = new BaseTextComponent('span', 'profile_page__default_label', '');
  const defaultStatusWrapper = createEditableField(
    'Default Status:',
    defaultStatus,
    `default-status-${index}`,
    (event) => {
      const target = event.currentTarget as HTMLElement;
      makeFieldEditableWithSelect(
        target.parentNode as HTMLElement,
        'Default Status:',
        defaultStatus,
        `default-status-${index}`,
        defaultOptions,
        (newValue) => {
          defaultLabel.node.textContent = newValue === 'Default' ? ' (Default)' : ' (Not default)';
          onStatusChange(newValue);
        },
        CLASS_NAMES.profileEditableField,
        CLASS_NAMES.profileInput,
      );
    },
    CLASS_NAMES.profileEditableField,
    CLASS_NAMES.profileInput,
  );

  return defaultStatusWrapper;
}
