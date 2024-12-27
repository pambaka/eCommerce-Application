import BaseComponent from './base-component';

export default class LabelComponent extends BaseComponent<HTMLLabelElement> {
  constructor(legendText: string, forAttribute?: string) {
    super('label');

    this.node.textContent = legendText;
    if (forAttribute) {
      this.node.htmlFor = forAttribute;
    }
  }
}
