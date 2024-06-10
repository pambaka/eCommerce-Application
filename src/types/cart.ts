export interface CartProduct {
  productId: string;
}

export interface Cart {
  id: string;
  version: string;
  lineItems: CartProduct[];
}
