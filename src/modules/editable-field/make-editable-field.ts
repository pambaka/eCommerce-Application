import ButtonWithSvgIcon from '../../components/button-with-svg-icon';
import editIcon from '../../assets/edit-icons-sprite.svg';
import createEditableField from './create-editable-field';
import validateEmail from '../../pages/validate-email';
import validateName from '../../pages/registration/logic/validate-name';
import validateBirthDate from '../../pages/registration/logic/validate-birth-date';
import { ID_NAMES } from '../../const';

export default function makeFieldEditable(
  wrapper: HTMLElement,
  labelText: string,
  value: string,
  id: string,
  saveCallback: (newValue: string) => void,
  wrapperClass: string,
  textClass: string,
) {
  const input = document.createElement('input');
  input.type = id === ID_NAMES.customerDob ? 'date' : 'text';
  input.value = value;
  input.className = textClass;
  input.id = id;

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
      }

      wrapper.removeAttribute('data-warning');

      if (warning) {
        wrapper.setAttribute('data-warning', warning);
        return;
      }

      saveCallback(input.value);
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
    if (event.key === 'Enter') {
      saveButton.node.click();
    }
  });

  wrapper.querySelector('span')?.replaceWith(input);
  wrapper.querySelector('.edit-button')?.replaceWith(saveButton.node);
}
