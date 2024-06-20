import BaseComponent from './base-component';

export default class Spinner extends BaseComponent {
  constructor() {
    super('div', 'spinner-container');
    const spinner = new BaseComponent('div', 'spinner');
    this.node.appendChild(spinner.node);
  }
}
