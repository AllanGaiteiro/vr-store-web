import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductFilter } from '../models/ProductFilter';
import { FilterPrices } from '../models/FilterPrices';

@Injectable({
  providedIn: 'root',
})
export class ParamsService {
  constructor() {}

  buildProductParams(
    filter: ProductFilter,
    option: {
      page: number;
      limit: number;
    }
  ): HttpParams {
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

    if (option.page) {
      params = params.set('page', option.page.toString());
    }
    if (option.limit) {
      params = params.set('limit', option.limit.toString());
    }

    return params;
  }

  buildPriceParams(
    filters: FilterPrices,
    option: {
      page: number;
      limit: number;
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
      if (option.singleItemPerProduct) {
        params = params.set(
          'singleItemPerProduct',
          option.singleItemPerProduct.toString()
        );
      }
      if (option.page) {
        params = params.set('page', option.page.toString());
      }
      if (option.limit) {
        params = params.set('limit', option.limit.toString());
      }
    }
    return params;
  }
}
