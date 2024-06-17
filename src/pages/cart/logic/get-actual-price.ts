import { CartProduct } from '../../../types/cart';

export default function getActualPrice(cartItem: CartProduct): number {
  let productPriceValue;
  if (cartItem.variant.prices[0].discounted) {
    productPriceValue = cartItem.variant.prices[0].discounted.value.centAmount;
  } else {
    productPriceValue = cartItem.variant.prices[0].value.centAmount;
  }
  return productPriceValue;
}
