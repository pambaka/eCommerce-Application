export default class BaseComponent<T extends HTMLElement = HTMLElement> {
  node: T;

  constructor(tag: string, className: string = '') {
    this.node = document.createElement(tag) as T;

    if (className) {
      this.node.classList.add(className);
    }
  }
}
