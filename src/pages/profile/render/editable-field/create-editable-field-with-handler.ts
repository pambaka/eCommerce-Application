import makeFieldEditable from './make-editable-field';
import createEditableField from './create-editable-field';
import showPasswordModal from '../show-password-modal';
import { ID_NAMES } from '../../../../const';
import updateCustomerPassword from '../../../../api/update-customer-password';

export default function createEditableFieldWithHandler(
  label: string,
  value: string,
  id: string,
  updateCallback: (newValue: string) => void,
  className: string,
  inputClassName: string,
): HTMLElement {
  return createEditableField(
    label,
    value,
    id,
    (event) => {
      const target = event.currentTarget as HTMLElement;
      if (id === ID_NAMES.customerPassword) {
        showPasswordModal(async (currentPassword, newPassword) => {
          await updateCustomerPassword(currentPassword, newPassword);
        });
      } else {
        makeFieldEditable(
          target.parentNode as HTMLElement,
          label,
          value || 'FR',
          id,
          updateCallback,
          className,
          inputClassName,
        );
      }
    },
    className,
    inputClassName,
  );
}
