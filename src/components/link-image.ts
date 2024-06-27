import BaseComponent from './base-component';
import SvgImage from './svg-image';

export default class LinkImage extends BaseComponent<HTMLAnchorElement> {
  constructor(linkHref: string, imageUrl: string) {
    super('a');
    this.node.href = linkHref;
    this.node.target = '_blank';

    const image = new SvgImage(imageUrl);
    this.node.append(image.node);
  }
}
