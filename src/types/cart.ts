export interface CartProduct {
  id: string;
  productId: string;
}

export interface Cart {
  id: string;
  version: string;
  lineItems: CartProduct[];
}

export interface UpdateCartData {
  action: 'addLineItem' | 'changeLineItemQuantity';
  quantity: number;
  lineItemId?: string;
}
