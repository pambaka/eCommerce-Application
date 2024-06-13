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
        Counter.setValue(value);

        return;
      }
    }

    Counter.reset();
  }

  static reset() {
    Counter.setValue(0);
  }

  private static getCounter(): HTMLElement {
    return DOM.elements[CLASS_NAMES.counter];
  }

  private static setValue(value: number) {
    const counter = this.getCounter();
    counter.textContent = `${value}`;
  }
}
