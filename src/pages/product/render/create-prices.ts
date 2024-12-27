import BaseTextComponent from '../../../components/base-text-component';
import { Product } from '../../../types/products';

export default function createPrices(parentElement: HTMLElement, product: Product): void {
  if (
    product.masterData.current.masterVariant.prices[0].discounted &&
    product.masterData.current.masterVariant.prices[0].discounted.value.centAmount
  ) {
    const oldPrice = new BaseTextComponent(
      'span',
      'old-price',
      `€ ${product.masterData.current.masterVariant.prices[0].value.centAmount / 100}`,
    );
    parentElement.append(oldPrice.node);

    const price = new BaseTextComponent(
      'span',
      'price',
      `€ ${product.masterData.current.masterVariant.prices[0].discounted.value.centAmount / 100}`,
    );
    parentElement.append(price.node);
  } else {
    const price = new BaseTextComponent(
      'span',
      'price',
      `€ ${product.masterData.current.masterVariant.prices[0].value.centAmount / 100}`,
    );
    parentElement.append(price.node);
  }
}
