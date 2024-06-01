import BaseTextComponent from '../../../components/base-text-component';
import { Product } from '../../../types/index';

export default function createPrices(parentElement: HTMLElement, product: Product): void {
  if (product.masterData.current.masterVariant.prices[0].discounted) {
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
