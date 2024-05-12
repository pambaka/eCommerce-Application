import BaseComponent from './base-component';

export default class OptionComponent extends BaseComponent<HTMLElement> {
  constructor(text: string, value: string) {
    super('option');
    this.node.innerText = text;
    this.node.setAttribute('value', value);
  }
}
