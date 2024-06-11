import LANGUAGE from './const';
import { MasterVariant } from './products';

export interface CartProduct {
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
}
