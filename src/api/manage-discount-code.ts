import { region } from './const';
import useToken from '../services/use-token';
import showModal from '../pages/show-modal';
import getActiveCart from './get-active-cart';
import createCart from './create-cart';
import isTokenActive from './is-token-active';

export default class CartDiscount {
  public static async getAccessToken(): Promise<string | undefined> {
    let token = useToken.customer.access.get() ?? undefined;
    if (!token) {
      showModal('Something went wrong', 'Please try again');
      return undefined;
    }

    const isActive = await isTokenActive(token);
    if (!isActive) {
      const refreshToken = useToken.customer.refresh.get() ?? undefined;
      if (refreshToken) {
        await useToken.fetchRefreshToken(refreshToken);
        token = useToken.customer.access.get() ?? undefined;
      } else {
        showModal('Something went wrong', 'Please try again');
        return undefined;
      }
    }

    return token;
  }

  public static async getDiscountCodes(): Promise<Response | undefined> {
    const token = await this.getAccessToken();
    if (!token) return undefined;

    const url = `https://api.${region}.commercetools.com/${process.env.project_key}/discount-codes`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }

  public static async applyDiscountCode(code: string): Promise<Response | undefined> {
    const token = await this.getAccessToken();
    if (!token) return undefined;

    let cart = await getActiveCart(token);
    if (!cart) {
      cart = await createCart(token);
    }
    if (!cart) {
      showModal('Something went wrong', 'Please try again');
      return undefined;
    }

    const url = `https://api.${region}.commercetools.com/${process.env.project_key}/me/carts/${cart.id}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: cart.version,
        actions: [
          {
            action: 'addDiscountCode',
            code,
          },
        ],
      }),
    });
    return response;
  }

  public static async removeDiscountCode(codeId: string): Promise<Response | undefined> {
    const token = await this.getAccessToken();
    if (!token) return undefined;

    let cart = await getActiveCart(token);
    if (!cart) {
      cart = await createCart(token);
    }
    if (!cart) {
      showModal('Something went wrong', 'Please try again');
      return undefined;
    }

    const url = `https://api.${region}.commercetools.com/${process.env.project_key}/me/carts/${cart.id}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: cart.version,
        actions: [
          {
            action: 'removeDiscountCode',
            discountCode: {
              typeId: 'discount-code',
              id: codeId,
            },
          },
        ],
      }),
    });
    return response;
  }
}
