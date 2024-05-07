export default class BaseTextComponent<T extends HTMLElement = HTMLElement> {
  node: T;

  constructor(tag: string, text: string, className: string = '') {
    this.node = document.createElement(tag) as T;
    this.node.innerText = text;

    if (className) {
      this.node.classList.add(className);
    }
  }
}
