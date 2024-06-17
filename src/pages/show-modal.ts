import BaseComponent from '../components/base-component';
import BaseTextComponent from '../components/base-text-component';
import ButtonComponent from '../components/button-component';
import '../styles/modal.scss';

export default function showModal(
  titleText: string,
  suggestionText: string,
  success?: boolean,
  onClose?: () => void,
): void {
  const existingModal = document.querySelector('.modal-window');

  if (existingModal) {
    const title = existingModal.querySelector('.modal-title');
    if (title) title.textContent = titleText;

    const suggestion = existingModal.querySelector('.modal-suggestion');
    if (suggestion) suggestion.textContent = suggestionText;

    return;
  }

  const backdrop = new BaseComponent('div', 'backdrop');

  const modal = new BaseComponent('div', 'modal-window');

  const title = new BaseTextComponent('p', 'modal-title', titleText);
  if (success) title.node.classList.add('success');

  const closeButton = new ButtonComponent(
    'close-button',
    () => {
      backdrop.node.remove();
      modal.node.remove();
      if (onClose) onClose();
    },
    '',
    false,
  );

  closeButton.node.ariaLabel = 'Close modal window';

  modal.node.append(title.node);
  if (suggestionText) {
    const suggestion = new BaseTextComponent('p', 'modal-suggestion', suggestionText);
    modal.node.append(suggestion.node);
  }
  modal.node.append(closeButton.node);

  document.body.append(backdrop.node, modal.node);
}
