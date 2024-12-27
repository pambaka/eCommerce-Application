import BaseComponent from './base-component';

export default class BaseImageComponent extends BaseComponent<HTMLImageElement> {
  constructor(className: string, imageSrc: string, alt: string) {
    super('img', className);
    this.node.src = imageSrc;
    this.node.alt = alt;
  }
}
