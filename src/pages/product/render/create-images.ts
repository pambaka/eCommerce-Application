import BaseComponent from '../../../components/base-component';
import BaseImageComponent from '../../../components/base-image-component';
import SvgImage from '../../../components/svg-image';
import { Product } from '../../../types/products';
import arrows from '../../../assets/arrows-sprite.svg';
import slide from '../slider/slide';
import LANGUAGE from '../../../types/const';
import placeholderImage from '../../../assets/no_image.png';
import showWiderImage from '../wider-image/show-wider-image';

export default function createImages(parentElement: HTMLElement, product: Product): void {
  const imagesArray = product.masterData.current.masterVariant.images;
  const mainImageLine = new BaseComponent('div', 'main-image-line');

  imagesArray.forEach((imageItem) => {
    const mainImageWrapper = new BaseComponent('div', 'main-image-wrapper');
    mainImageLine.node.append(mainImageWrapper.node);
    const mainImage = new BaseImageComponent(
      'product__image',
      imageItem.url,
      `${product.masterData.current.name[LANGUAGE]}`,
    );
    mainImage.node.addEventListener('click', () => {
      showWiderImage(imageItem.url, product.masterData.current.name[LANGUAGE]);
    });
    mainImageWrapper.node.append(mainImage.node);
  });
  if (imagesArray.length === 0) {
    const mainImageWrapper = new BaseComponent('div', 'main-image-wrapper');
    const placeholder = new BaseImageComponent('product__image', placeholderImage, 'no image');
    placeholder.node.classList.add('no_image');
    mainImageWrapper.node.append(placeholder.node);
    parentElement.append(mainImageWrapper.node);
  }

  if (imagesArray.length > 0) {
    const imageRowWrapper = new BaseComponent('div', 'image-row-wrapper');
    if (imagesArray.length > 1) {
      mainImageLine.node.style.right = '0%';
      const leftArrow = new SvgImage(`${arrows}#left`, 'left-arrow');
      leftArrow.node.classList.add('faded');
      leftArrow.node.addEventListener('click', () => {
        slide('left', imagesArray);
      });
      imageRowWrapper.node.append(leftArrow.node);
    }

    const imageRow = new BaseComponent('div', 'image-row');
    imagesArray.forEach((arrItem, index, arr) => {
      const smallImageWrapper = new BaseComponent('div', 'small-image-wrapper');
      if (arr.length > 1 && index === 0) smallImageWrapper.node.classList.add('current');
      const anImage = new BaseImageComponent('product__small-image', arrItem.url, 'small-image');
      smallImageWrapper.node.append(anImage.node);
      imageRow.node.append(smallImageWrapper.node);
    });
    imageRowWrapper.node.append(imageRow.node);

    if (imagesArray.length > 1) {
      const rightArrow = new SvgImage(`${arrows}#right`, 'right-arrow');
      rightArrow.node.addEventListener('click', () => {
        slide('right', imagesArray);
      });
      imageRowWrapper.node.append(rightArrow.node);
    }

    parentElement.append(mainImageLine.node, imageRowWrapper.node);
  }
}
