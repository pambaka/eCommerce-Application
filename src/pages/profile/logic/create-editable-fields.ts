import createEditableField from '../render/editable-field/create-editable-field';
import makeFieldEditable from '../render/editable-field/make-editable-field';
import { CLASS_NAMES } from '../../../const';
import { Address } from '../../../types/index';

export default function createEditableFields(
  fields: { label: string; value: string; id: string; validator: (value: string) => string }[],
  updatedAddress: Partial<Address>,
  fieldsValid: { [key: string]: boolean },
  onFieldChange: (key: keyof Address, newValue: string) => void,
  validateFields: () => void,
  showSaveButton: () => void,
): HTMLElement[] {
  const localUpdatedAddress = { ...updatedAddress };
  const localFieldsValid = { ...fieldsValid };

  const editableFields = fields.map((field) => {
    const editableField = createEditableField(
      field.label,
      field.value!,
      field.id,
      (event) => {
        const target = event.currentTarget as HTMLElement;
        makeFieldEditable(
          target.parentNode as HTMLElement,
          field.label,
          field.value!,
          field.id,
          (newValue, isValid) => {
            const key = field.id.split('-')[1] as keyof Address;
            localUpdatedAddress[key] = newValue;
            localFieldsValid[field.id] = isValid;
            validateFields();
            showSaveButton();
            onFieldChange(key, newValue);
          },
          CLASS_NAMES.profileEditableField,
          CLASS_NAMES.profileInput,
        );
      },
      CLASS_NAMES.profileEditableField,
      CLASS_NAMES.profileInput,
    );
    localFieldsValid[field.id] = !field.validator(field.value!);
    return editableField;
  });

  Object.assign(updatedAddress, localUpdatedAddress);
  Object.assign(fieldsValid, localFieldsValid);

  return editableFields;
}
