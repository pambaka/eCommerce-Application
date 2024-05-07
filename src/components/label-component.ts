import BaseComponent from './base-component';

export default class LabelComponent extends BaseComponent<HTMLLabelElement> {
  constructor(legendText: string) {
    super('label');

    this.node.textContent = legendText;
  }
}
