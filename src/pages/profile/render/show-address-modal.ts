import AddressSectionComponent from '../../../modules/address-module';
import { CustomerIncomeData, Address } from '../../../types/index';
import BaseComponent from '../../../components/base-component';
import ButtonComponent from '../../../components/button-component';

export default function showAddressModal(
  address: Address,
  index: number,
  userInfo: CustomerIncomeData,
  updateAddNewAddressButtonState: () => void,
  isNew: boolean = false,
): void {
  const addressSection = new AddressSectionComponent(address, index, userInfo, updateAddNewAddressButtonState, isNew);

  const backdrop = new BaseComponent('div', 'backdrop');
  const modal = new BaseComponent('div', 'modal-window');

  addressSection.editButton.node.classList.add('hidden');
  addressSection.saveButton.node.classList.remove('hidden');

  modal.node.appendChild(addressSection.node);

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
  modal.node.appendChild(closeButton.node);

  document.body.append(backdrop.node, modal.node);
}
