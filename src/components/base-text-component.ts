import BaseComponent from './base-component';

export default class BaseTextComponent extends BaseComponent<HTMLElement> {
  constructor(tag: string, className: string, text: string) {
    super(tag, className);
    this.node.innerText = text;
  }
}
