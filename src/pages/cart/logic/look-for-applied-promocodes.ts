import { Cart } from '../../../types/cart';

export default function lookForAppliedPromocodes(cart: Cart): Set<string> {
  const setOfPromocodes: Set<string> = new Set();
  cart.lineItems.forEach((lineItem) => {
    lineItem.discountedPricePerQuantity.forEach((discountItem) => {
      discountItem.discountedPrice.includedDiscounts.forEach((element) => {
        setOfPromocodes.add(element.discount.id);
      });
    });
  });
  console.log('setOfPromocodes: ', setOfPromocodes);
  return setOfPromocodes;
}
