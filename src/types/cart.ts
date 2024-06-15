import LANGUAGE from './const';
import { MasterVariant, ProductPrice } from './products';

export interface CartProduct {
  id: string;
  productId: string;
  name: {
    [LANGUAGE]: string;
  };
  variant: MasterVariant;
  quantity: number;
  totalPrice: ProductPrice;
}

export interface DiscountCode {
  id: string;
}

export interface Cart {
  id: string;
  version: string;
  lineItems: CartProduct[];
  totalPrice: ProductPrice;
  discountCodes: DiscountCode[];
}

export interface UpdateCartData {
  action: 'addLineItem' | 'changeLineItemQuantity' | 'removeLineItem';
  quantity: number;
  lineItemId?: string;
}

export interface AddPromoCode {
  action: 'addDiscountCode';
  code: string;
}
