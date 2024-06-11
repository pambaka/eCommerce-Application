import { Cart } from '../../../types/cart';

export default function calculateSumInCart(activeCart: Cart) {
  let totalSum = 0;

  activeCart.lineItems.forEach((cartItem) => {
    let productPriceValue;
    if (cartItem.variant.prices[0].discounted) {
      productPriceValue = cartItem.variant.prices[0].discounted.value.centAmount;
    } else {
      productPriceValue = cartItem.variant.prices[0].value.centAmount;
    }

    const sum = (cartItem.quantity * productPriceValue) / 100;

    totalSum += sum;
  });

  return totalSum;
}
