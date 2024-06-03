import ButtonWithSvgIcon from '../../../../components/button-with-svg-icon';
import editIcon from '../../../../assets/edit-icons-sprite.svg';
import createEditableField from './create-editable-field';
import validateEmail from '../../../validate-email';
import validateName from '../../../registration/logic/validate-name';
import validateBirthDate from '../../../registration/logic/validate-birth-date';
import { ID_NAMES } from '../../../../const';
import validatePostalCode from '../../../registration/logic/validate-postal-code';
import validateStreet from '../../../registration/logic/validate-street';
import renderSelectCountriesInProfile from '../render-select-countries';
import updateSaveChangesButtonState from './update-save-changes-state';
import updateCustomerInfo from '../../logic/update-customer-info-in-ui';
import getUserInfo from '../../../../api/get-user-info';

export default function makeFieldEditable(
  wrapper: HTMLElement,
  labelText: string,
  value: string,
  id: string,
  saveCallback: (newValue: string, isValid: boolean) => void,
  wrapperClass: string,
  textClass: string,
) {
  let input: HTMLInputElement | HTMLSelectElement;

  if (id.startsWith('address-country')) {
    input = document.createElement('select');
    input.className = textClass;
    input.id = id;
    renderSelectCountriesInProfile(input as HTMLSelectElement);
    (input as HTMLSelectElement).value = value;
  } else {
    input = document.createElement('input');
    input.type = id === ID_NAMES.customerDob ? 'date' : 'text';
    input.value = value;
    input.className = textClass;
    input.id = id;
  }

  const saveButton = new ButtonWithSvgIcon(
    'save-button',
    async () => {
      let warning = '';
      if (id === ID_NAMES.customerEmail) {
        warning = validateEmail(input.value);
      } else if (id === ID_NAMES.customerName) {
        warning = validateName(input.value, 'first-name');
      } else if (id === ID_NAMES.customerSurname) {
        warning = validateName(input.value, 'last-name');
      } else if (id === ID_NAMES.customerDob) {
        warning = validateBirthDate(input.value);
      } else if (id.startsWith('address-postalCode')) {
        warning = validatePostalCode(input.value);
      } else if (id.startsWith('address-streetName')) {
        warning = validateStreet(input.value);
      } else if (id.startsWith('address-city')) {
        warning = validateName(input.value, 'city');
      }

      const parentElement = input.parentNode as HTMLElement;
      const relativeWrapper = parentElement.querySelector('.relative-wrapper') as HTMLElement;
      relativeWrapper.innerHTML = '';

      if (warning) {
        const warningElement = document.createElement('p');
        warningElement.className = 'warning-text';
        warningElement.textContent = warning;
        relativeWrapper.appendChild(warningElement);
        saveCallback(input.value, false);
        return;
      }

      try {
        const success = await updateCustomerInfo(id, input.value);
        if (
          !success &&
          [ID_NAMES.customerEmail, ID_NAMES.customerName, ID_NAMES.customerSurname, ID_NAMES.customerDob].includes(id)
        ) {
          const userInfo = await getUserInfo();
          if (userInfo) {
            let currentValue = value;
            if (id === ID_NAMES.customerEmail) {
              currentValue = userInfo.email;
            } else if (id === ID_NAMES.customerName) {
              currentValue = userInfo.firstName;
            } else if (id === ID_NAMES.customerSurname) {
              currentValue = userInfo.lastName;
            } else if (id === ID_NAMES.customerDob) {
              currentValue = userInfo.dateOfBirth;
            }
            input.value = currentValue;
            const warningElement = document.createElement('p');
            warningElement.className = 'warning-text';
            warningElement.textContent = 'Failed to update data on server';
            relativeWrapper.appendChild(warningElement);
            saveCallback(currentValue, false);
            return;
          }
        }
        saveCallback(input.value, true);

        const newField = createEditableField(
          labelText,
          input.value,
          id,
          (event) => {
            const target = event.currentTarget as HTMLElement;
            makeFieldEditable(
              target.parentNode as HTMLElement,
              labelText,
              input.value,
              id,
              saveCallback,
              wrapperClass,
              textClass,
            );
          },
          wrapperClass,
          textClass,
        );
        wrapper.replaceWith(newField);
        updateSaveChangesButtonState();
      } catch (error) {
        // console.error('Error updating customer data:', error);
        const warningElement = document.createElement('p');
        warningElement.className = 'warning-text';
        warningElement.textContent = 'Failed to update data on server';
        relativeWrapper.appendChild(warningElement);
        saveCallback(input.value, false);
      }
    },
    'Save',
    'Save',
    `${editIcon}#save`,
  );

  input.addEventListener('keydown', (event) => {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      saveButton.node.click();
    }
  });

  wrapper.querySelector('span')?.replaceWith(input);
  wrapper.querySelector('.edit-button')?.replaceWith(saveButton.node);
  updateSaveChangesButtonState();
}
