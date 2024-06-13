import getActiveCart from '../api/get-active-cart';
import { CLASS_NAMES, DOM } from '../const';
import useToken from './use-token';
import { Cart } from '../types/cart';
import getQuantity from '../utils/get-quantity';

export default class Counter {
  static async update(isAnonymous: boolean, cart?: Cart) {
    let currentCart: Cart | undefined;

    if (cart) {
      currentCart = cart;
    } else {
      const token = isAnonymous ? await useToken.anonymous.access.get() : await useToken.access.get();
      if (token) {
        currentCart = await getActiveCart(token);
      }
    }

    if (currentCart) {
      const value = getQuantity(currentCart.lineItems);

      if (value) {
        Counter.show();
        Counter.setValue(value);

        return;
      }
    }

    Counter.hide();
  }

  static hide() {
    const counter = this.getCounter();
    counter.textContent = '0';
    counter.classList.add(`${CLASS_NAMES.counter}--hidden`);
  }

  static show() {
    const counter = this.getCounter();
    counter.classList.remove(`${CLASS_NAMES.counter}--hidden`);
  }

  private static getCounter(): HTMLElement {
    return DOM.elements[CLASS_NAMES.counter];
  }

  private static setValue(value: number) {
    const counter = this.getCounter();
    counter.textContent = `${value}`;
  }
}
