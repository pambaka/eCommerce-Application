import BaseComponent from './base-component';

export default class BurgerMenuButton extends BaseComponent<HTMLButtonElement> {
  constructor(className: string, callback: (event: Event) => void) {
    super('button', className);

    this.node.setAttribute('aria-label', 'Toggle navigation');
    this.node.setAttribute('aria-expanded', 'false');
    this.node.addEventListener('click', callback);
  }
}
