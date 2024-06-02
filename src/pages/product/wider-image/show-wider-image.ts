import BaseComponent from '../../../components/base-component';
import BaseImageComponent from '../../../components/base-image-component';
import ButtonComponent from '../../../components/button-component';
import './image-modal.scss';

export default function showWiderImage(imageUrl: string, productName: string) {
  const backdrop = new BaseComponent('div', 'backdrop');
  const modal = new BaseComponent('div', 'modal-wider-image');

  const biggerPicture = new BaseImageComponent('modal__image', imageUrl, productName);
  biggerPicture.node.setAttribute('title', productName);

  const closeButton = new ButtonComponent(
    'close-button',
    () => {
      backdrop.node.remove();
      modal.node.remove();
      document.body.style.overflowY = 'unset';
    },
    '',
    false,
  );
  closeButton.node.ariaLabel = 'Close';

  closeButton.node.setAttribute('title', 'Close');
  modal.node.append(biggerPicture.node, closeButton.node);

  document.body.append(backdrop.node, modal.node);
  document.body.style.overflowY = 'hidden';
}
