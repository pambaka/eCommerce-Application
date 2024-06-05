// export default function updateSaveChangesButtonState() {
//   const addressWrapper = document.querySelector('.profile_page__address_wrapper');
//   const saveChangesButton = document.querySelector('.save_changes__btn');
//   const deleteChangesButton = document.querySelector('.delete_address__btn');

//   if (addressWrapper && saveChangesButton instanceof HTMLButtonElement && deleteChangesButton instanceof HTMLButtonElement) {
//     const visibleSaveButtons = addressWrapper.querySelectorAll('.save-button:not(.hidden)');
//     const spans = addressWrapper.querySelectorAll('span.profile_page__input');

//     const anySpanEmpty = Array.from(spans).some((span) => span.textContent?.trim() === '');

//     saveChangesButton.disabled = visibleSaveButtons.length >= 1 || anySpanEmpty;
//     deleteChangesButton.disabled = visibleSaveButtons.length >= 1 || anySpanEmpty;
//   }
// }

let saveChangesClicked = false;

export default function updateSaveChangesButtonState() {
  const addressWrapper = document.querySelector('.profile_page__address_wrapper');
  const saveChangesButton = document.querySelector('.save_changes__btn');
  const deleteChangesButton = document.querySelector('.delete_address__btn');

  if (
    addressWrapper &&
    saveChangesButton instanceof HTMLButtonElement &&
    deleteChangesButton instanceof HTMLButtonElement
  ) {
    const visibleSaveButtons = addressWrapper.querySelectorAll('.save-button:not(.hidden)');
    const spans = addressWrapper.querySelectorAll('span.profile_page__input');

    const anySpanEmpty = Array.from(spans).some((span) => span.textContent?.trim() === '');

    saveChangesButton.disabled = visibleSaveButtons.length >= 1 || anySpanEmpty;
    deleteChangesButton.disabled = visibleSaveButtons.length >= 1 || anySpanEmpty || !saveChangesClicked;

    saveChangesButton.addEventListener('click', () => {
      saveChangesClicked = true;
      updateSaveChangesButtonState();
    });
  }
}
