import BaseComponent from '../../components/base-component';
import BaseTextComponent from '../../components/base-text-component';
import LabelComponent from '../../components/label-component';
import ButtonWithSvgIcon from '../../components/button-with-svg-icon';
import editIcon from '../../assets/edit-icons-sprite.svg';

export default function createEditableField(
  labelText: string,
  value: string,
  id: string,
  editCallback: (event: Event) => void,
  wrapperClass: string,
  textClass: string,
) {
  const wrapper = new BaseComponent('div', wrapperClass);

  const label = new LabelComponent(labelText);
  label.node.setAttribute('for', id);
  const text = new BaseTextComponent('span', textClass, value);
  text.node.id = id;
  const editButton = new ButtonWithSvgIcon(
    'edit-button',
    editCallback,
    `Edit ${labelText}`,
    'Edit',
    `${editIcon}#edit`,
  );

  wrapper.node.append(label.node, text.node, editButton.node);
  return wrapper.node;
}
