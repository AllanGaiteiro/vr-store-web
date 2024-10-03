import { Product } from './Product';

export interface ProductFilter extends Product {
  price: number;
  costOperator: '<=' | '>=';
  priceOperator: '<=' | '>=';
}
