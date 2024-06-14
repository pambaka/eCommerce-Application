export default function updateTotalPrice(totalPriceValue: number) {
  const totalPrice = document.querySelector('.total');
  if (totalPrice instanceof HTMLElement) {
    totalPrice.innerText = `Total: € ${totalPriceValue / 100}`;
  }
}
