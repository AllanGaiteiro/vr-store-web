// price.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { Price } from '../models/Price';
import { environment } from '../../environments/environment';
import { FilterPrices } from '../models/FilterPrices';
import { ParamsService } from './params.service';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private paramsService: ParamsService) {}

  getPrices(
    filters: FilterPrices,
    option: {
      singleItemPerProduct: boolean;
    } = {
      singleItemPerProduct: false,
    }
  ): Observable<{
    data: Price[];
    length: number;
    page: number;
    limit: number;
  }> {
    const params = this.paramsService.buildPriceParams(filters, option);
    return this.http.get<{
      data: Price[];
      length: number;
      page: number;
      limit: number;
    }>(`${this.apiUrl}/prices`, { params });
  }

  createPrice(newPrice: Price): Promise<Price> {
    return firstValueFrom(
      this.http.post<Price>(`${this.apiUrl}/prices`, {
        ...newPrice,
        storeId: newPrice.store.id,
      })
    );
  }
  updatePrice(newPrice: Price): Promise<Price> {
    return firstValueFrom(
      this.http.patch<Price>(`${this.apiUrl}/prices/${newPrice.id}`, newPrice)
    );
  }
  deletePrice(priceId: number): Promise<Price> {
    return firstValueFrom(
      this.http.delete<Price>(`${this.apiUrl}/prices/${priceId}`)
    );
  }
}
