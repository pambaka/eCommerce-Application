import AddressSectionComponent from '../../../../modules/address-module';
import ButtonComponent from '../../../../components/button-component';

export default function updateAddNewAddressButtonState(
  addressSections: AddressSectionComponent[],
  addNewAddressButton: ButtonComponent,
) {
  const allFieldsValid = addressSections.every((section) => section.areAllFieldsValid());
  const addressButton = addNewAddressButton;
  addressButton.node.disabled = !allFieldsValid;

  const lastSection = addressSections[addressSections.length - 1];
  if (lastSection) {
    lastSection.onDeleteButtonClick = () => {
      addressButton.node.disabled = false;
      if (addressSections.length === 0) {
        addressButton.node.disabled = false;
      }
    };
  }

  if (addressSections.length === 0) {
    addressButton.node.disabled = false;
  }
}
