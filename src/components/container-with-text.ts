import BaseComponent from './base-component';
import BaseTextComponent from './base-text-component';

export default class ContainerWithText extends BaseComponent {
  constructor(containerClassName: string, textContent: string) {
    super('div', containerClassName);

    const text = new BaseTextComponent('p', '', textContent);
    this.node.append(text.node);
  }
}
