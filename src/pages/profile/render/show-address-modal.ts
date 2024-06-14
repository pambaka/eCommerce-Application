import BaseComponent from '../../../components/base-component';
import ButtonComponent from '../../../components/button-component';
import AddressSectionComponent from '../../../modules/address-module';

export default function showAddressModal(addressComponent: AddressSectionComponent): void {
  const originalParent = addressComponent.node.parentNode;
  const originalNextSibling = addressComponent.node.nextSibling;

  function restoreAddressComponent(component: AddressSectionComponent) {
    if (originalParent) {
      if (originalNextSibling) {
        originalParent.insertBefore(component.node, originalNextSibling);
      } else {
        originalParent.appendChild(component.node);
      }
    }
    component.editButton.node.classList.remove('hidden');
    component.deleteButton.node.classList.remove('hidden');
    component.saveButton.node.classList.add('hidden');
  }

  const backdrop = new BaseComponent('div', 'backdrop');
  const modal = new BaseComponent('div', 'modal-window');

  const closeButton = new ButtonComponent(
    'close-button',
    () => {
      backdrop.node.remove();
      modal.node.remove();
      restoreAddressComponent(addressComponent);
    },
    '',
    false,
  );

  closeButton.node.ariaLabel = 'Close';

  modal.node.appendChild(addressComponent.node);
  modal.node.appendChild(closeButton.node);

  addressComponent.editButton.node.classList.add('hidden');
  addressComponent.deleteButton.node.classList.add('hidden');
  addressComponent.saveButton.node.classList.remove('hidden');

  document.body.append(backdrop.node, modal.node);
}
