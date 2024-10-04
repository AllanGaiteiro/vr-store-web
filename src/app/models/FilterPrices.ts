import { Filter } from "./Filter";

export interface FilterPrices extends Filter {
  productId?: number;
  storeId?: number;
  price?: number;
  cost?: number;
  description?: string;
  priceOperator?: '<=' | '>=';
  costOperator?: '<=' | '>=';
}
