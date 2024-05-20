import BaseComponent from '../components/base-component';
import InputComponent from '../components/input-component';
import LabelComponent from '../components/label-component';
import validateForm from '../pages/validate-form';

export default function inputModule(
  inputClassName: string,
  inputType: 'text' | 'password' | 'email' | 'date',
  labelText: string,
): HTMLDivElement {
  const div = new BaseComponent<HTMLDivElement>('div', 'input-module');
  const label = new LabelComponent(labelText);
  const input = new InputComponent(inputClassName, inputType, validateForm);

  if (inputType === 'date') {
    input.node.removeEventListener('keyup', validateForm);
    input.node.addEventListener('blur', validateForm);
  }

  div.node.append(label.node, input.node);

  return div.node;
}
