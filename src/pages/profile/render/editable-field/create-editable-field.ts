import BaseComponent from '../../../../components/base-component';
import BaseTextComponent from '../../../../components/base-text-component';
import LabelComponent from '../../../../components/label-component';
import ButtonWithSvgIcon from '../../../../components/button-with-svg-icon';
import editIcon from '../../../../assets/edit-icons-sprite.svg';
import updateSaveChangesButtonState from './update-save-changes-state';

export default function createEditableField(
  labelText: string,
  value: string,
  id: string,
  editCallback: (event: Event) => void,
  wrapperClass: string,
  textClass: string,
  warning: string | null = null,
) {
  const wrapper = new BaseComponent('div', wrapperClass);

  const label = new LabelComponent(labelText, id);
  const text = new BaseTextComponent('span', textClass, value);
  text.node.id = id;
  const editButton = new ButtonWithSvgIcon(
    'edit-button',
    (event) => {
      editCallback(event);
      updateSaveChangesButtonState();
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
