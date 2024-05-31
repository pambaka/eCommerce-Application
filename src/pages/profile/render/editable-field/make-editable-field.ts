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
    () => {
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
      }

      const parentElement = input.parentNode as HTMLElement;
      parentElement.removeAttribute('data-warning');

      if (warning) {
        parentElement.setAttribute('data-warning', warning);
        saveCallback(input.value, false);
        return;
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
}
