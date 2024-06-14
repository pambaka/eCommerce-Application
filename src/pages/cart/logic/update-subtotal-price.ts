export default function updateSubtotalPrice(cartProductNode: HTMLElement, priceValue: number, quantity: number) {
  const subTotal = cartProductNode.querySelector('.sub-total');
  if (subTotal instanceof HTMLElement) {
    subTotal.innerText = String((quantity * priceValue) / 100);
  }
}
