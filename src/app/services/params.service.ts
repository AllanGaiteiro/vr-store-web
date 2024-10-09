import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterPrices } from '../models/FilterPrices';
import { ProductFilter } from '../models/ProductFilter';

@Injectable({
  providedIn: 'root',
})
export class ParamsService {

  buildProductParams(filters: ProductFilter): HttpParams {
    let params = new HttpParams();
    if (filters.id) {
      params = params.set('productId', filters.id.toString());
    }

    if (filters.description) {
      params = params.set('description', filters.description.toString());
    }

    if (filters.cost) {
      if (filters.costOperator === '<=') {
        params = params.set('maxCost', filters.cost.toString());
      } else if (filters.costOperator === '>=') {
        params = params.set('minCost', filters.cost.toString());
      }
    }

    if (filters.page !== undefined && filters?.page !== null) {
      params = params.set('page', (filters.page + 1).toString());
    }

    if (filters.limit !== undefined && filters?.limit !== null) {
      params = params.set('limit', filters.limit.toString());
    }

    if (filters.sortBy) {
      params = params.append('sortBy', filters.sortBy);
    }
    if (filters.sortOrder) {
      params = params.append('sortOrder', filters.sortOrder);
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

      if (filters.page !== undefined) {
        params = params.set('page', (filters.page + 1).toString());
      }
      if (filters.limit) {
        params = params.set('limit', filters.limit.toString());
      }

      if (filters.sortBy) {
        params = params.append('sortBy', filters.sortBy);
      }
      if (filters.sortOrder) {
        params = params.append('sortOrder', filters.sortOrder);
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
