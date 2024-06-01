import BaseComponent from '../../../components/base-component';
import BaseImageComponent from '../../../components/base-image-component';
import { Product } from '../../../types/index';

export default function createImages(parentElement: HTMLElement, product: Product): void {
  const imagesArray = product.masterData.current.masterVariant.images;
  const mainImageWrapper = new BaseComponent('div', 'main-image-wrapper');
  const mainImage = new BaseImageComponent('product__image', imagesArray[0].url, 'main image');

  mainImageWrapper.node.append(mainImage.node);
  const imageRow = new BaseComponent('div', 'image-row');
  imagesArray.forEach((arrItem) => {
    const smallImageWrapper = new BaseComponent('div', 'small-image-wrapper');
    const anImage = new BaseImageComponent('product__small-image', arrItem.url, 'small-image');
    smallImageWrapper.node.append(anImage.node);
    imageRow.node.append(smallImageWrapper.node);
  });
  parentElement.append(mainImageWrapper.node, imageRow.node);
}
