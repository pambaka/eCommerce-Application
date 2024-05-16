export default class SvgImage {
  node: SVGElement;

  constructor(url: string, className?: string) {
    // url format: path + fileName.svg + # + svg id (from svg sprite file)

    this.node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.node.innerHTML = `<use xlink:href=${url}></use>`;

    if (className) this.node.classList.add(className);
  }
}
