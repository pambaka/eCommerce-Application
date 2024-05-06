import BaseComponent from './base-component';

export default class InputComponent extends BaseComponent<HTMLInputElement> {
  constructor(className: string, type: 'text' | 'password' | 'email' | 'date', callback: (event: Event) => void) {
    super('input', className);

    this.node.type = type;
    this.node.addEventListener('keyup', callback);
  }
}
