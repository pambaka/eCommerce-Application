import AddressSectionComponent from '../../../../modules/address-module';
import ButtonComponent from '../../../../components/button-component';

export default function updateAddNewAddressButtonState(
  addressSections: AddressSectionComponent[],
  addNewAddressButton: ButtonComponent,
) {
  const allFieldsValid = addressSections.every((section) => section.areAllFieldsValid());
  const allSaveButtonsHidden = addressSections.every((section) => section.isSaveButtonHidden());
  const addressButton = addNewAddressButton;
  addressButton.node.disabled = !(allFieldsValid && allSaveButtonsHidden);

  const lastSection = addressSections[addressSections.length - 1];
  if (lastSection) {
    lastSection.onDeleteButtonClick = () => {
      addressButton.node.disabled = false;
    };
  }
}
