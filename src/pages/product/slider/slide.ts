import { ImageURL } from '../../../types/products';
import changeMainImage from './change-main-image';
import getCurrentPosition from './get-current-position';

export default function slide(direction: 'left' | 'right', imagesArray: ImageURL[]) {
  console.log('imagesArray: ', imagesArray);
  console.log('direction: ', direction);

  const arrOfDivsWithImg = document.querySelectorAll('.small-image-wrapper');

  // const mainImage = assertNonNullable<HTMLImageElement>('.product__image');
  // const stylesOfMainImageInnerRow: CSSStyleDeclaration = window.getComputedStyle(mainImage);
  // const mainImageWidth = stylesOfMainImageInnerRow.getPropertyValue('width');
  // console.log('mainImageWidth: ', mainImageWidth);

  if (arrOfDivsWithImg) {
    let currentPosition = getCurrentPosition();
    console.log(getCurrentPosition());
    if (direction === 'left' && currentPosition > 0) {
      arrOfDivsWithImg.forEach((item) => {
        item.classList.remove('current');
      });
      currentPosition -= 1;
      arrOfDivsWithImg[currentPosition].classList.add('current');
      changeMainImage(imagesArray, currentPosition);
    } else if (direction === 'right' && currentPosition < arrOfDivsWithImg.length - 1) {
      arrOfDivsWithImg.forEach((item) => {
        item.classList.remove('current');
      });
      currentPosition += 1;
      arrOfDivsWithImg[currentPosition].classList.add('current');
      changeMainImage(imagesArray, currentPosition);
    }
    console.log('currentPosition: ', currentPosition);

    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    if (leftArrow && rightArrow) {
      if (currentPosition === 0) {
        leftArrow.classList.add('faded');
      } else leftArrow.classList.remove('faded');
      if (currentPosition === arrOfDivsWithImg.length - 1) {
        rightArrow.classList.add('faded');
      } else rightArrow.classList.remove('faded');
    }
  }
}
