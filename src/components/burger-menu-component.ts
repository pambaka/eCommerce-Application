import BaseComponent from './base-component';

export default class BurgerMenuButton extends BaseComponent<HTMLButtonElement> {
  constructor(className: string, callback: (event: Event) => void) {
    super('button', `${className} hidden`);

    this.node.setAttribute('aria-label', 'Toggle navigation');
    this.node.setAttribute('aria-expanded', 'false');

    for (let i = 0; i < 3; i += 1) {
      const span = document.createElement('span');
      this.node.appendChild(span);
    }

    this.node.addEventListener('click', callback);
  }
}
