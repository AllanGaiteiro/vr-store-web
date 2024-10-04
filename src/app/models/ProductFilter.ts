import { Filter } from './Filter';

export interface ProductFilter extends Filter {
  id: number;
  description: string;
  cost: number;
  image: string | null;
  price: number;
  costOperator: '<=' | '>=';
  priceOperator: '<=' | '>=';
}
