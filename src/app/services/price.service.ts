// price.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Price } from '../models/Price';
import { environment } from '../../environments/environment';
import { FilterPrices } from '../models/FilterPrices';
import { Product } from '../models/Product';
import { ParamsService } from './params.service';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private paramsService: ParamsService) {}

  getPrices(filters: FilterPrices, singleItemPerProduct = false): Observable<Price[]> {
    let params = this.paramsService.buildPriceParams(filters, singleItemPerProduct);
    return this.http.get<Price[]>(`${this.apiUrl}/prices`, { params });
  }
}
