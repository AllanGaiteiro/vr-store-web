export interface FilterPrices {
  productId?: number;
  storeId?: number;
  price?: number;
  cost?: number;
  description?: string;
  priceOperator?: '<=' | '>=';
  costOperator?: '<=' | '>=';
  page?: number;
  limit?: number;
}
