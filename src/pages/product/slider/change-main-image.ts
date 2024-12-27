import { ImageURL } from '../../../types/products';
import assertNonNullable from '../../../utils/assert-non-nullable';

export default function changeMainImage(imagesArray: ImageURL[], currentPosition: number) {
  const mainImageLine = assertNonNullable<HTMLDivElement>('.main-image-line');
  mainImageLine.style.right = `${currentPosition * 100}%`;
}
