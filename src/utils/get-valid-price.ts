const MAX_PRICE_EURO = 1000;

export default function getValidPrice(price: number): number | undefined {
  let validPrice: number = price;

  if (Number.isNaN(validPrice)) return undefined;

  if (price < 0) validPrice = 0;
  else if (price > MAX_PRICE_EURO * 100) validPrice = MAX_PRICE_EURO * 100;

  return validPrice;
}
