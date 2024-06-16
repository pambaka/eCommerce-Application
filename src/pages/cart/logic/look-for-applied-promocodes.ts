import { Cart } from '../../../types/cart';

export default function lookForAppliedPromocodes(cart: Cart): Set<string> {
  const setOfPromocodes: Set<string> = new Set();
  cart.lineItems.forEach((lineItem) => {
    // if (lineItem.discountedPricePerQuantity.length > 0) {
    lineItem.discountedPricePerQuantity.forEach((discountItem) => {
      // if (discountItem.discountedPrice.includedDiscounts.length > 0) {
      discountItem.discountedPrice.includedDiscounts.forEach((element) => {
        setOfPromocodes.add(element.discount.id);
      });
      // }
    });
    // }
  });
  console.log('setOfPromocodes: ', setOfPromocodes);
  return setOfPromocodes;
}
