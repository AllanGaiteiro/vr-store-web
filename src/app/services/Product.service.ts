import { Injectable } from '@angular/core';
import { firstValueFrom, Observable, of, Subject } from 'rxjs';
import { Product } from '../models/Product';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductFilter } from '../models/ProductFilter';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private productsSubject = new Subject<Product[]>(); // Subject para emitir atualizações

  constructor(private http: HttpClient) {}

  getProducts(filter?: ProductFilter): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
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
    return firstValueFrom(this.http.delete<void>(`${this.apiUrl}/products/${productId}`))
      .then(() => {
        // Notifica que os produtos mudaram após a exclusão
        this.fetchProducts(); // Chame um método para reobter os produtos
      });
  }

  private fetchProducts(): void {
    this.getProducts().subscribe(products => {
      this.productsSubject.next(products); // Emite a lista atualizada
    });
  }

  // Método para expor o Subject para que os componentes possam se inscrever
  getProductsUpdates(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }
}
