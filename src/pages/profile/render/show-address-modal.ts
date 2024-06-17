import BaseComponent from '../../../components/base-component';
import ButtonComponent from '../../../components/button-component';
import AddressSectionComponent from '../../../modules/address-module';

// const openModals: HTMLElement[] = [];

// export default function showAddressModal(addressComponent: AddressSectionComponent): void {
//   const originalParent = addressComponent.node.parentNode;
//   const originalNextSibling = addressComponent.node.nextSibling;

//   function restoreAddressComponent(component: AddressSectionComponent) {
//     if (originalParent) {
//       if (originalNextSibling) {
//         originalParent.insertBefore(component.node, originalNextSibling);
//       } else {
//         originalParent.appendChild(component.node);
//       }
//     }
//     component.editButton.node.classList.remove('hidden');
//     component.deleteButton.node.classList.remove('hidden');
//     component.saveButton.node.classList.add('hidden');
//   }

//   const backdrop = new BaseComponent('div', 'backdrop');
//   backdrop.node.classList.add('backdrop-address');
//   const modal = new BaseComponent('div', 'modal-window');

//   const closeButton = new ButtonComponent(
//     'close-button',
//     () => {
//       openModals.forEach((modalElement) => {
//         modalElement.remove();
//       });
//       openModals.length = 0;
//       restoreAddressComponent(addressComponent);
//       addressComponent.closeModal();
//     },
//     '',
//     false,
//   );

//   closeButton.node.ariaLabel = 'Close';

//   modal.node.appendChild(addressComponent.node);
//   modal.node.appendChild(closeButton.node);

//   addressComponent.editButton.node.classList.add('hidden');
//   addressComponent.deleteButton.node.classList.add('hidden');
//   addressComponent.saveButton.node.classList.remove('hidden');

//   document.body.append(backdrop.node, modal.node);
//   openModals.push(backdrop.node, modal.node);
// }

const openModals: HTMLElement[] = [];

export default function showAddressModal(addressComponent: AddressSectionComponent): void {
  const addressCopy = new AddressSectionComponent(
    { ...addressComponent.address },
    addressComponent.index,
    addressComponent.userInfo,
    addressComponent.isNew,
  );

  const backdrop = new BaseComponent('div', 'backdrop');
  backdrop.node.classList.add('backdrop-address');
  const modal = new BaseComponent('div', 'modal-window');

  const closeButton = new ButtonComponent(
    'close-button',
    () => {
      openModals.forEach((modalElement) => {
        modalElement.remove();
      });
      openModals.length = 0;
      addressCopy.closeModal();
      if (addressCopy.isNew) {
        addressComponent.node.remove();
        addressComponent.onDeleteButtonClick();
      } else {
        addressComponent.render();
      }
    },
    '',
    false,
  );

  closeButton.node.ariaLabel = 'Close';

  modal.node.appendChild(addressCopy.node);
  modal.node.appendChild(closeButton.node);

  document.body.append(backdrop.node, modal.node);
  openModals.push(backdrop.node, modal.node);
}
