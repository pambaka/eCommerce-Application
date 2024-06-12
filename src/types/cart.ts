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
}

export interface Cart {
  id: string;
  version: string;
  lineItems: CartProduct[];
  totalPrice: ProductPrice;
}

export interface UpdateCartData {
  action: 'addLineItem' | 'changeLineItemQuantity';
  quantity: number;
  lineItemId?: string;
}
