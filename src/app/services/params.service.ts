import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductFilter } from '../models/ProductFilter';
import { FilterPrices } from '../models/FilterPrices';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  constructor() { }

  buildProductParams(filter: ProductFilter): HttpParams {
    let params = new HttpParams();

    if (filter.id) {
      params = params.set('productId', filter.id.toString());
    }

    if (filter.description) {
      console.log(filter.description);
      params = params.set('description', filter.description.toString());
    }

    if (filter.cost) {
      if (filter.costOperator === '<=') {
        params = params.set('maxCost', filter.cost.toString());
      } else if (filter.costOperator === '>=') {
        params = params.set('minCost', filter.cost.toString());
      }
    }

    return params;
  }

  buildPriceParams(filters: FilterPrices, singleItemPerProduct: boolean) {
    let params = new HttpParams();

    if (filters) {
      if (filters.productId) {
        params = params.set('productId', filters.productId.toString());
      }
      if (filters.storeId) {
        params = params.set('storeId', filters.storeId.toString());
      }
      if (filters.minPriceValue) {
        params = params.set('minPriceValue', filters.minPriceValue.toString());
      }
      if (filters.maxPriceValue) {
        params = params.set('maxPriceValue', filters.maxPriceValue.toString());
      }
      if (singleItemPerProduct) {
        params = params.set('singleItemPerProduct', singleItemPerProduct.toString());
      }
    }
    return params;
  }
}
