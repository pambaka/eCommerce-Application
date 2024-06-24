import BaseComponent from '../../../../components/base-component';
import BaseTextComponent from '../../../../components/base-text-component';
import LabelComponent from '../../../../components/label-component';
import ButtonWithSvgIcon from '../../../../components/button-with-svg-icon';
import editIcon from '../../../../assets/edit-icons-sprite.svg';
import updateSaveChangesButtonState from './update-save-changes-state';

function isEditableArea(element: HTMLElement): boolean {
  return element.closest('.modal-window') !== null || element.closest('.profile_page__address_wrapper') === null;
}

export default function createEditableField(
  labelText: string,
  value: string,
  id: string,
  editCallback: (event: Event) => void,
  wrapperClass: string,
  textClass: string,
  warning: string | null = null,
  placeholder: string | null = null,
) {
  const wrapper = new BaseComponent('div', wrapperClass);

  const label = new LabelComponent(labelText, id);
  const text = new BaseTextComponent('span', textClass, value);
  text.node.id = id;

  if (placeholder) {
    text.node.setAttribute('placeholder', placeholder);
  }

  text.node.addEventListener('click', (event) => {
    if (isEditableArea(text.node)) {
      editCallback(event);
      updateSaveChangesButtonState();
    }
  });

  const editButton = new ButtonWithSvgIcon(
    'edit-button',
    (event) => {
      if (isEditableArea(editButton.node)) {
        editCallback(event);
        updateSaveChangesButtonState();
      }
    },
    `Edit ${labelText}`,
    'Edit',
    `${editIcon}#edit`,
  );

  const relativeWrapper = new BaseComponent('div', 'relative-wrapper');
  if (warning) {
    const warningElement = new BaseComponent('p', 'warning-text');
    warningElement.node.textContent = warning;
    relativeWrapper.node.appendChild(warningElement.node);
  }

  wrapper.node.append(label.node, text.node, editButton.node, relativeWrapper.node);
  return wrapper.node;
}
