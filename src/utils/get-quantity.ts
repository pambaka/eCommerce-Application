import { CartProduct } from '../types/cart';

export default function getQuantity(lineItems: CartProduct[]): number {
  const value = lineItems.reduce((accum, { quantity }) => accum + quantity, 0);

  return value;
}
