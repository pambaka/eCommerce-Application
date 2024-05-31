import ButtonWithSvgIcon from '../../../../components/button-with-svg-icon';
import editIcon from '../../../../assets/edit-icons-sprite.svg';
import createEditableField from './create-editable-field';

export default function makeFieldEditableWithSelect(
  wrapper: HTMLElement,
  labelText: string,
  value: string,
  id: string,
  options: { label: string; value: string }[],
  saveCallback: (newValue: string) => void,
  wrapperClass: string,
  textClass: string,
) {
  const select = document.createElement('select');
  select.className = textClass;
  select.id = id;

  options.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    if (option.value === value) {
      optionElement.selected = true;
    }
    select.appendChild(optionElement);
  });

  const saveButton = new ButtonWithSvgIcon(
    'save-button',
    () => {
      saveCallback(select.value);
      const newField = createEditableField(
        labelText,
        select.value,
        id,
        (event) => {
          const target = event.currentTarget as HTMLElement;
          makeFieldEditableWithSelect(
            target.parentNode as HTMLElement,
            labelText,
            select.value,
            id,
            options,
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

  wrapper.querySelector('span')?.replaceWith(select);
  wrapper.querySelector('.edit-button')?.replaceWith(saveButton.node);

  select.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      saveButton.node.click();
    }
  });
}
