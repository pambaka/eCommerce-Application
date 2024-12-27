import { ImageURL } from '../../../types/products';
import assertNonNullable from '../../../utils/assert-non-nullable';

export default function slideWide(indexOfImage: number, imagesArray: ImageURL[]) {
  const leftArrow = document.querySelector('.left-arrow-wide');
  const rightArrow = document.querySelector('.right-arrow-wide');
  if (leftArrow && rightArrow) {
    if (indexOfImage === 0) {
      leftArrow.classList.add('wide-faded');
    } else leftArrow.classList.remove('wide-faded');
    if (indexOfImage === imagesArray.length - 1) {
      rightArrow.classList.add('wide-faded');
    } else rightArrow.classList.remove('wide-faded');
  }

  const imageLine = assertNonNullable<HTMLDivElement>('.enlarged-line');
  imageLine.style.right = `${indexOfImage * 100}%`;
}
