import BaseComponent from './base-component';

export default class InputCheckboxComponent extends BaseComponent<HTMLInputElement> {
  constructor(id?: string) {
    super('input');

    this.node.type = 'checkbox';
    if (id) this.node.id = id;
  }
}
