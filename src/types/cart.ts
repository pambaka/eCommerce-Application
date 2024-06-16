import LANGUAGE from './const';
import { MasterVariant, ProductPrice } from './products';

export interface IncludedDiscounts {
  discount: {
    id: 'string';
  };
}

export interface DiscountedPrice {
  discountedPrice: {
    includedDiscounts: IncludedDiscounts[];
  };
}

export interface CartProduct {
  id: string;
  productId: string;
  name: {
    [LANGUAGE]: string;
  };
  variant: MasterVariant;
  quantity: number;
  totalPrice: ProductPrice;
  discountedPricePerQuantity: DiscountedPrice[];
  // discountedPrice?: {
  //   includedDiscounts: IncludedDiscounts[];
  // };
}

export interface DiscountCode {
  discountCode: {
    id: string;
  };
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

export interface Promocode {
  name: {
    [LANGUAGE]: 'string';
  };
}
