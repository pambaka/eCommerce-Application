import makeFieldEditable from './make-editable-field';
import createEditableField from './create-editable-field';
import showPasswordModal from '../show-password-modal';
import { ID_NAMES } from '../../../../const';
import updateCustomerPassword from '../../../../api/update-customer-password';

// export default function createEditableFieldWithHandler(
//   label: string,
//   value: string,
//   id: string,
//   updateCallback: (newValue: string) => void,
//   className: string,
//   inputClassName: string,
// ): HTMLElement {
//   return createEditableField(
//     label,
//     value,
//     id,
//     (event) => {
//       const target = event.currentTarget as HTMLElement;
//       makeFieldEditable(target.parentNode as HTMLElement, label, value, id, updateCallback, className, inputClassName);
//     },
//     className,
//     inputClassName,
//   );
// }

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
          try {
            await updateCustomerPassword(currentPassword, newPassword);
          } catch (error) {
            console.error('Error updating password:', error);
          }
        });
      } else {
        makeFieldEditable(
          target.parentNode as HTMLElement,
          label,
          value,
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
