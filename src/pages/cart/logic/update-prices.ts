export default function updatePrices(
  cartProductNode: HTMLElement,
  priceValue: number,
  quantity: number,
  totalPriceValue: number,
) {
  const subTotal = cartProductNode.querySelector('.sub-total');
  if (subTotal instanceof HTMLElement) {
    subTotal.innerText = String((quantity * priceValue) / 100);
  }

  const totalPrice = document.querySelector('.total');
  if (totalPrice instanceof HTMLElement) {
    totalPrice.innerText = `Total: € ${totalPriceValue / 100}`;
  }
}
