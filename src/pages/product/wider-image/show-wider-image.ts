import BaseComponent from '../../../components/base-component';
import BaseImageComponent from '../../../components/base-image-component';
import ButtonComponent from '../../../components/button-component';
import LANGUAGE from '../../../types/const';
import { ImageURL, Product } from '../../../types/products';
import './image-modal.scss';
import SvgImage from '../../../components/svg-image';
import slideWide from './slide-wide';
import arrows from '../../../assets/arrows-sprite.svg';

export default function showWiderImage(imagesArray: ImageURL[], indexOfImage: number, product: Product) {
  let currentPosition: number = indexOfImage;

  const backdrop = new BaseComponent('div', 'backdrop');
  const modalFrame = new BaseComponent('div', 'modal-wider-image');
  const modal = new BaseComponent('div', 'modal-wrapper');
  modalFrame.node.append(modal.node);

  const enlargedLine = new BaseComponent('div', 'enlarged-line');
  enlargedLine.node.style.right = `${currentPosition * 100}%`;
  const allImages: HTMLImageElement[] = [];
  imagesArray.forEach((arrItem) => {
    const zoomUrl = `${arrItem.url.slice(0, arrItem.url.lastIndexOf('.'))}-zoom${arrItem.url.slice(arrItem.url.lastIndexOf('.'))}`;
    const imageWrapper = new BaseComponent('div', 'wide-image-wrapper');
    enlargedLine.node.append(imageWrapper.node);
    const bigImage = new BaseImageComponent('modal__image', zoomUrl, `${product.masterData.current.name[LANGUAGE]}`);
    bigImage.node.setAttribute('title', product.masterData.current.name[LANGUAGE]);
    allImages.push(bigImage.node);
    imageWrapper.node.append(bigImage.node);

    modal.node.append(enlargedLine.node);
  });

  const leftArrow = new SvgImage(`${arrows}#left`, 'left-arrow-wide');
  if (currentPosition === 0) leftArrow.node.classList.add('wide-faded');
  leftArrow.node.addEventListener('click', () => {
    if (currentPosition > 0) {
      currentPosition -= 1;
      slideWide(currentPosition, imagesArray);
    }
  });

  const rightArrow = new SvgImage(`${arrows}#right`, 'right-arrow-wide');
  if (currentPosition === imagesArray.length - 1) rightArrow.node.classList.add('wide-faded');
  rightArrow.node.addEventListener('click', () => {
    if (currentPosition < imagesArray.length - 1) {
      currentPosition += 1;
      slideWide(currentPosition, imagesArray);
    }
  });

  if (imagesArray.length > 1) {
    document.body.append(leftArrow.node, rightArrow.node);
  }

  const closeButton = new ButtonComponent(
    'close-button',
    () => {
      backdrop.node.remove();
      modalFrame.node.remove();
      document.body.style.overflowY = 'unset';
      closeButton.node.remove();
      if (imagesArray.length > 1) {
        leftArrow.node.remove();
        rightArrow.node.remove();
      }
    },
    '',
    false,
  );

  closeButton.node.ariaLabel = 'Close';
  closeButton.node.setAttribute('title', 'Close');
  document.body.append(closeButton.node);
  document.body.append(backdrop.node, modalFrame.node);
  document.body.style.overflowY = 'hidden';

  let sliderWidth: number;
  function resize() {
    const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('.modal__image');
    const sliderWrapper = document.querySelector('.modal-wrapper');
    if (sliderWrapper instanceof HTMLElement) {
      sliderWidth = sliderWrapper.offsetWidth;
    }
    enlargedLine.node.style.width = `${sliderWidth * images.length}px`;
    images.forEach((item) => {
      item.setAttribute('width', `${sliderWidth}px`);
      item.setAttribute('height', 'auto');
    });
  }
  if (imagesArray.length > 1) {
    setTimeout(() => {
      resize();
    }, 500);
    window.addEventListener('resize', resize);
  }
}
