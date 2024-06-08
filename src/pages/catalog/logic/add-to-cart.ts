export default function addToCart(event: Event): void {
  event.stopPropagation();

  const button = event.target;

  if (button instanceof HTMLButtonElement) {
    button.disabled = true;
    button.textContent = 'in the cart'.toUpperCase();
  }
}
