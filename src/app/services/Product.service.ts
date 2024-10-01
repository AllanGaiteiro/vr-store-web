import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/Product';
import { ProductFilter } from '../models/ProductFilter';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    { id: 1, description: 'Produto A', cost: 10.0, image: null },
    { id: 2, description: 'Produto B', cost: 15.0, image: null },
    { id: 3, description: 'Produto C', cost: 12.0, image: null },
  ];

  getProducts(filter: Partial<ProductFilter> = {}): Observable<Product[]> {
    let filteredProducts = this.products;

    if (filter?.id !== null && filter.id !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.id === filter.id
      );
    }

    if (
      filter?.description !== '' &&
      filter.description !== null &&
      filter.description !== undefined
    ) {
      filteredProducts = filteredProducts.filter((product) =>
        product.description
          .toLowerCase()
          .includes(filter.description?.toLowerCase() || '')
      );
    }

    if (filter.cost !== null && filter.cost !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.cost === filter.cost
      );
    }

    if (filter.price !== null && filter.price !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.cost === filter.price
      );
    }

    return of(filteredProducts);
  }

  getProduct(id: number): Observable<Product> {
    let product = this.products.find((product) => product.id === id);
    if (product !== undefined) {
      return of(product);
    }
    throw new Error('Error Ocurrend In get Product');
  }

  async createProduct(newProduct: Product): Promise<Product> {
    newProduct.id = this.products.length
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;

    this.products.push(newProduct);

    const res = await of(newProduct).toPromise();
    if (res === undefined) {
      throw new Error('Error Ocurrend In create Product');
    } else {
      return res;
    }
  }
  async updateProduct(updateProduct: Product): Promise<Product> {
    const product = this.products.find((p) => p.id === updateProduct.id);

    if (product) {
      product.cost = updateProduct.cost;
      product.description = updateProduct.description;
      product.image = updateProduct.image;
    }

    const res = await of(product).toPromise();
    if (res === undefined) {
      throw new Error('Error Ocurrend In update Product');
    } else {
      return res;
    }
  }

  deleteProduct(productId: number): Promise<void> {
    this.products = this.products.filter((product) => product.id !== productId);
    return of().toPromise();
  }

  editProduct(updatedProduct: Product): Observable<Product> {
    const index = this.products.findIndex(
      (product) => product.id === updatedProduct.id
    );
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
    return of(updatedProduct);
  }
}
