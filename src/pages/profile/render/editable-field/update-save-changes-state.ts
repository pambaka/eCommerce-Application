export default function updateSaveChangesButtonState() {
  const addressWrapper = document.querySelector('.profile_page__address_wrapper');
  const saveChangesButton = document.querySelector('.save_changes__btn') as HTMLButtonElement;
  if (addressWrapper && saveChangesButton) {
    const visibleSaveButtons = addressWrapper.querySelectorAll('.save-button:not(.hidden)');
    saveChangesButton.disabled = visibleSaveButtons.length >= 1;
  }
}
