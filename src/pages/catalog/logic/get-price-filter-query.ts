import getValidPrice from '../../../utils/get-valid-price';
import { QUERY_BASE } from '../const';

export default function getPriceFilterQuery(): string | undefined {
  let queryPrice: string | undefined;

  const fromPrice = document.getElementById('priceFrom');
  const toPrice = document.getElementById('priceTo');

  if (fromPrice instanceof HTMLInputElement && toPrice instanceof HTMLInputElement) {
    let fromCent: number | undefined;
    let toCent: number | undefined;

    if (fromPrice.value) fromCent = getValidPrice(+fromPrice.value * 100);
    if (toPrice.value) toCent = getValidPrice(+toPrice.value * 100);

    if (typeof fromCent === 'number') fromPrice.value = `${fromCent / 100}`;
    else fromPrice.value = '';
    if (typeof toCent === 'number') toPrice.value = `${toCent / 100}`;
    else toPrice.value = '';

    if (typeof fromCent === 'number' && typeof toCent === 'number') {
      if (toCent === fromCent) {
        queryPrice = `${QUERY_BASE.price}:${toCent}`;
      } else {
        if (fromCent > toCent) {
          [toCent, fromCent] = [fromCent, toCent];
          fromPrice.value = `${fromCent / 100}`;
          toPrice.value = `${toCent / 100}`;
        }
        queryPrice = `${QUERY_BASE.price}:range(${fromCent} to ${toCent})`;
      }
    } else if (!fromCent && typeof toCent === 'number') {
      queryPrice = `${QUERY_BASE.price}:range(* to ${toCent})`;
    } else if (typeof fromCent === 'number' && !toCent) {
      queryPrice = `${QUERY_BASE.price}:range(${fromCent} to *)`;
    }
  }

  return queryPrice;
}
