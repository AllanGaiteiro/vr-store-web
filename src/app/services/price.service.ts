// price.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Price } from '../models/Price';
import { environment } from '../../environments/environment';
import { FilterPrices } from '../models/FilterPrices';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPrices(filters: FilterPrices): Observable<Price[]> {
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
    }

    console.log(filters)
    return this.http.get<Price[]>(`${this.apiUrl}/prices`, { params });
  }
}
