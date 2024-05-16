import BaseComponent from './base-component';

export default class BurgerMenuIcon extends BaseComponent<HTMLButtonElement> {
  constructor(className: string) {
    super('div', `${className}`);

    for (let i = 0; i < 3; i += 1) {
      const span = document.createElement('span');
      this.node.appendChild(span);
    }
  }
}
