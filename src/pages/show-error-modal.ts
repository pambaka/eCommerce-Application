import BaseComponent from '../components/base-component';
import BaseTextComponent from '../components/base-text-component';
import ButtonComponent from '../components/button-component';

export default function showErrorModal(titleText: string, descriptionText: string): void {
  const backdrop = new BaseComponent('div', 'backdrop');

  const modal = new BaseComponent('div', 'modal');

  const title = new BaseTextComponent('p', '', titleText);

  const description = new BaseTextComponent('p', '', descriptionText);

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

  modal.node.append(title.node, description.node, closeButton.node);
  document.body.append(backdrop.node, modal.node);
}
