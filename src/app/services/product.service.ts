import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable, of, Subject } from 'rxjs';
import { Product } from '../models/Product';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductFilter } from '../models/ProductFilter';
import { PriceService } from './price.service';
import { FilterPrices } from '../models/FilterPrices';
import { ParamsService } from './params.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private productsSubject = new Subject<{
    data: Product[];
    length: number;
    page: number;
    limit: number;
  }>();

  constructor(
    private http: HttpClient,
    private priceService: PriceService,
    private paramsService: ParamsService
  ) {}

  getProducts(
    filter?: ProductFilter,
  ): Observable<{
    data: Product[];
    length: number;
    page: number;
    limit: number;
  }> {
    if (filter?.price !== undefined || filter?.price !== null) {
      const params = filter
        ? {
            params: this.paramsService.buildProductParams(filter),
          }
        : {};
      return this.http.get<{
        data: Product[];
        length: number;
        page: number;
        limit: number;
      }>(`${this.apiUrl}/products`, params);
    } else {
      const filterPrice: FilterPrices = {
        productId: filter?.id,
        price: filter?.price,
        cost: filter?.cost,
        description: filter?.description,
        costOperator: filter?.costOperator,
        priceOperator: filter?.priceOperator,
      };
      return this.priceService
        .getPrices(filterPrice, {
          singleItemPerProduct: true,
        })
        .pipe(
          map((res) => ({
            ...res,
            data: res.data.map((d) => d.product),
          }))
        );
    }
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  async createProduct(newProduct: Product): Promise<Product> {
    return firstValueFrom(
      this.http.post<Product>(`${this.apiUrl}/products`, newProduct)
    );
  }

  async updateProduct(updateProduct: Product): Promise<Product> {
    return firstValueFrom(
      this.http.patch<Product>(
        `${this.apiUrl}/products/${updateProduct.id}`,
        updateProduct
      )
    );
  }

  deleteProduct(productId: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/products/${productId}`)
    ).then(() => {
      // Notifica que os produtos mudaram após a exclusão
      this.fetchProducts(); // Chame um método para reobter os produtos
    });
  }

  private fetchProducts(): void {
    this.getProducts().subscribe((products) => {
      this.productsSubject.next(products); // Emite a lista atualizada
    });
  }

  // Método para expor o Subject para que os componentes possam se inscrever
  getProductsUpdates(): Observable<{
    data: Product[];
    length: number;
    page: number;
    limit: number;
  }> {
    return this.productsSubject.asObservable();
  }
}
