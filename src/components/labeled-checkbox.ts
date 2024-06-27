import InputCheckboxComponent from './checkbox-component';
import LabelComponent from './label-component';

export default class LabeledCheckbox extends LabelComponent {
  constructor(labelText: string, inputValue: string) {
    super(labelText);

    const checkbox = new InputCheckboxComponent();
    checkbox.node.value = inputValue;

    this.node.prepend(checkbox.node);
  }
}
