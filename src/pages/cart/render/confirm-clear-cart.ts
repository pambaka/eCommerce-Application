import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonComponent from '../../../components/button-component';
import clearCart from '../logic/clear-cart';

export default function confirmClearcart(): void {
  const backdrop = new BaseComponent('div', 'backdrop');

  const modal = new BaseComponent('div', 'request-modal');

  const title = new BaseTextComponent('p', 'modal-title', 'Do you want to clear the cart?');
  function closeThisModal() {
    backdrop.node.remove();
    modal.node.remove();
  }

  const closeButton = new ButtonComponent('close-button', closeThisModal, '', false);

  closeButton.node.ariaLabel = 'Close modal window';

  const buttonsContainer = new BaseComponent('div', 'clear-modal__buttons');
  const yesButton = new ButtonComponent(
    'buttons-yes',
    async () => {
      buttonsContainer.node.remove();
      closeButton.node.remove();
      const clearing = new BaseTextComponent('p', 'clearing', 'Clearing...');
      modal.node.append(clearing.node);
      await clearCart();
      closeThisModal();
    },
    'Yes',
    false,
  );
  const noButton = new ButtonComponent(
    'buttons-no',
    () => {
      closeThisModal();
    },
    'No',
    false,
  );

  buttonsContainer.node.append(yesButton.node, noButton.node);
  modal.node.append(title.node, closeButton.node, buttonsContainer.node);

  document.body.append(backdrop.node, modal.node);
}
