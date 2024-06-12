import BaseComponent from '../../../components/base-component';
import BaseImageComponent from '../../../components/base-image-component';
import BaseTextComponent from '../../../components/base-text-component';
import { Cart } from '../../../types/cart';
import LANGUAGE from '../../../types/const';
import handleQuantityChange from '../logic/handle-quantity-change';
import limitInputValue from '../logic/limit-input-value';

export default function renderProductsInCart(activeCart: Cart, parentElement: HTMLElement) {
  activeCart.lineItems.forEach((cartItem) => {
    const productWrapper = new BaseComponent('div', 'cart__product');
    const productImage = new BaseImageComponent(
      'cart__product-image',
      cartItem.variant.images[0].url,
      cartItem.name[LANGUAGE],
    );

    const productInfoWrapper = new BaseComponent('div', 'cart__product-info-wrapper');
    const productTitle = new BaseTextComponent('p', 'cart__product-name', cartItem.name[LANGUAGE]);

    let productPriceValue;
    if (cartItem.variant.prices[0].discounted) {
      productPriceValue = cartItem.variant.prices[0].discounted.value.centAmount;
    } else {
      productPriceValue = cartItem.variant.prices[0].value.centAmount;
    }

    const priceInEuro = productPriceValue / 100;

    const productPrice = new BaseTextComponent('p', 'cart__product-price', `Price: €\xa0${priceInEuro}`);
    const productQuantityContainer = new BaseComponent('p', 'quantity-container');
    const productQuantity = new BaseTextComponent('span', 'quantity-title', 'Qty:\xa0');

    const productQuantityInput = new BaseComponent<HTMLInputElement>('input', 'quantity-input');
    productQuantityInput.node.type = 'number';
    productQuantityInput.node.setAttribute('min', '1');
    productQuantityInput.node.setAttribute('max', '99');
    productQuantityInput.node.addEventListener('blur', (event) => {
      handleQuantityChange(event, cartItem);
    });
    productQuantityInput.node.addEventListener('keyup', (event) => {
      limitInputValue(event);
      if (event.keyCode === 13 && event.target instanceof HTMLInputElement) {
        event.target.blur();
      }
    });
    productQuantityInput.node.addEventListener('keydown', (event) => {
      // restrict input dot, plus, minus
      if (
        event.keyCode === 190 ||
        event.keyCode === 191 ||
        event.keyCode === 107 ||
        event.keyCode === 187 ||
        event.keyCode === 109 ||
        event.keyCode === 189
      ) {
        event.preventDefault();
      }
    });
    productQuantityInput.node.value = String(cartItem.quantity);
    productQuantityContainer.node.append(productQuantity.node, productQuantityInput.node);

    productInfoWrapper.node.append(productTitle.node, productPrice.node, productQuantityContainer.node);

    const productPriceWraper = new BaseComponent('div', 'cart__product-price-wrapper');
    const productPriceTotal = new BaseTextComponent('p', 'cart__product-price-total', '€\xa0');

    const sum = (cartItem.quantity * productPriceValue) / 100;

    const productPriceSubTotal = new BaseTextComponent('span', 'sub-total', `${sum}`);
    productPriceTotal.node.append(productPriceSubTotal.node);

    productPriceWraper.node.append(productPriceTotal.node);

    productWrapper.node.append(productImage.node, productInfoWrapper.node, productPriceWraper.node);
    parentElement.append(productWrapper.node);
  });
}
