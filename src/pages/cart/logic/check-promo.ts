export default function checkPromo(event: Event) {
  const inputField = event.target;
  if (inputField instanceof HTMLInputElement) {
    const promoBtn = document.querySelector('.promo-btn');
    if (!promoBtn) return;

    if (inputField.value.length > 2) {
      promoBtn.removeAttribute('disabled');
    } else {
      promoBtn.setAttribute('disabled', 'true');
    }
  }
}
