export default function limitInputValue(event: KeyboardEvent) {
  const inputField = event.currentTarget;
  if (inputField instanceof HTMLInputElement) {
    const inputValue = Number(inputField.value);
    const limitMin = Number(inputField.getAttribute('min'));

    if (limitMin && inputValue < limitMin) {
      inputField.value = String(limitMin);
    }
    const limitMax = Number(inputField.getAttribute('max'));

    if (limitMax && inputValue > limitMax) {
      inputField.value = String(limitMax);
    }
  }
}
