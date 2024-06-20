import BaseComponent from '../../../components/base-component';
import ButtonComponent from '../../../components/button-component';
import AddressSectionComponent from '../../../modules/address-module';

const openModals: HTMLElement[] = [];

export default function showAddressModal(addressComponent: AddressSectionComponent): void {
  openModals.forEach((modalElement) => {
    modalElement.remove();
  });
  openModals.length = 0;

  if (document.querySelector('.modal-window')) {
    return;
  }

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
        addressComponent.updateAddress(addressCopy.updatedAddress);
      }
      addressComponent.resetButtonVisibility();
      AddressSectionComponent.removeModalElements();
    },
    '',
    false,
  );

  closeButton.node.ariaLabel = 'Close';

  modal.node.append(addressCopy.node, closeButton.node);

  addressCopy.editButton.node.classList.add('hidden');
  addressCopy.deleteButton.node.classList.add('hidden');
  addressCopy.saveButton.node.classList.remove('hidden');
  addressCopy.node.querySelectorAll('.edit-button').forEach((button) => {
    button.classList.remove('hidden');
  });

  addressCopy.updateButtonVisibility(true);

  document.body.append(backdrop.node, modal.node);
  openModals.push(backdrop.node, modal.node);

  addressCopy.saveButton.node.addEventListener('click', async () => {
    await addressComponent.updateCheckboxStatesFromModal(
      addressCopy.shippingChecked,
      addressCopy.billingChecked,
      addressCopy.defaultShippingChecked,
      addressCopy.defaultBillingChecked,
    );

    openModals.forEach((modalElement) => {
      modalElement.remove();
    });
    openModals.length = 0;
    AddressSectionComponent.removeModalElements();

    addressComponent.updateAddress(addressCopy.updatedAddress);
  });
}
