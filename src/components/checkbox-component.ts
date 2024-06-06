import BaseComponent from './base-component';

export default class InputCheckboxComponent extends BaseComponent<HTMLInputElement> {
  constructor(id?: string, checked: boolean = false) {
    super('input');

    this.node.type = 'checkbox';
    if (id) this.node.id = id;
    this.node.checked = checked;
  }
}
