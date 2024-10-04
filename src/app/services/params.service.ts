import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductFilter } from '../models/ProductFilter';
import { FilterPrices } from '../models/FilterPrices';

@Injectable({
  providedIn: 'root',
})
export class ParamsService {
  constructor() {}

  buildProductParams(filter: ProductFilter): HttpParams {
    let params = new HttpParams();

    if (filter.id) {
      params = params.set('productId', filter.id.toString());
    }

    if (filter.description) {
      params = params.set('description', filter.description.toString());
    }

    if (filter.cost) {
      if (filter.costOperator === '<=') {
        params = params.set('maxCost', filter.cost.toString());
      } else if (filter.costOperator === '>=') {
        params = params.set('minCost', filter.cost.toString());
      }
    }

    if (filter.page) {
      params = params.set('page', (filter.page + 1).toString());
    }
    if (filter.limit) {
      params = params.set('limit', filter.limit.toString());
    }

    return params;
  }

  buildPriceParams(
    filters: FilterPrices,
    option: {
      singleItemPerProduct: boolean;
    }
  ) {
    let params = new HttpParams();

    if (filters) {
      if (filters.productId) {
        params = params.set('productId', filters.productId.toString());
      }

      if (filters.storeId) {
        params = params.set('storeId', filters.storeId.toString());
      }

      if (filters.description) {
        params = params.set('description', filters.description.toString());
      }

      if (filters.price) {
        if (filters.priceOperator === '<=') {
          params = params.set('maxPriceValue', filters.price.toString());
        } else if (filters.priceOperator === '>=') {
          params = params.set('minPriceValue', filters.price.toString());
        }
      }
      if (filters.cost) {
        if (filters.costOperator === '<=') {
          params = params.set('maxCost', filters.cost.toString());
        } else if (filters.costOperator === '>=') {
          params = params.set('minCost', filters.cost.toString());
        }
      }

      if (filters.page) {
        params = params.set('page', (filters.page + 1).toString());
      }
      if (filters.limit) {
        params = params.set('limit', filters.limit.toString());
      }

      if (option.singleItemPerProduct) {
        params = params.set(
          'singleItemPerProduct',
          option.singleItemPerProduct.toString()
        );
      }
    }
    return params;
  }
}
