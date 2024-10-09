import { Product } from './Product';
import { Store } from './Store';

export interface Price {
  id: number;
  store: Store;
  product: Product;
  priceValue: number;
}
