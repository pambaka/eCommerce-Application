import BaseComponent from './base-component';

export default class ButtonComponent extends BaseComponent<HTMLButtonElement> {
  constructor(className: string, callback: (event: Event) => void, textContent: string, isDisabled: boolean) {
    super('button', className);

    this.node.textContent = textContent.toUpperCase();
    this.node.addEventListener('click', callback);

    if (isDisabled) {
      this.node.setAttribute('disabled', '');
    }
  }
}
