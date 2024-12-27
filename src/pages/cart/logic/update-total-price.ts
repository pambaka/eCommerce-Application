import { Cart } from '../../../types/cart';
import getFullPriceFromCart from './get-full-price-from-cart';

export default function updateTotalPrice(cart: Cart) {
  const totalPrice = document.querySelector('.total');
  const totalFullPrice = document.querySelector('.total-full');
  if (totalPrice instanceof HTMLElement && totalFullPrice instanceof HTMLElement) {
    totalPrice.innerText = `${cart.totalPrice.centAmount / 100}`;
    const fullTotalPriceValue = getFullPriceFromCart(cart);

    if (fullTotalPriceValue !== cart.totalPrice.centAmount) {
      totalFullPrice.innerText = `€\xa0${fullTotalPriceValue / 100}`;
    } else {
      totalFullPrice.innerText = '';
    }
  }
}
