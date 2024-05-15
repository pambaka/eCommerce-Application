import BaseComponent from '../components/base-component';
import BaseTextComponent from '../components/base-text-component';
import ButtonComponent from '../components/button-component';
import '../styles/modal.scss';

export default function showErrorModal(titleText: string, descriptionText: string, success?: boolean): void {
  const backdrop = new BaseComponent('div', 'backdrop');

  const modal = new BaseComponent('div', 'modal-window');

  const title = new BaseTextComponent('p', '', titleText);
  if (success) title.node.classList.add('success');

  const closeButton = new ButtonComponent(
    'close-button',
    () => {
      backdrop.node.remove();
      modal.node.remove();
    },
    '',
    false,
  );

  closeButton.node.ariaLabel = 'Close';
  modal.node.append(title.node, closeButton.node);

  if (descriptionText) {
    const description = new BaseTextComponent('p', '', descriptionText);
    modal.node.append(description.node);
  }

  document.body.append(backdrop.node, modal.node);
}
