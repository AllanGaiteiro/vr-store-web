import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/Product';
import { ProductFilter } from '../../../models/ProductFilter';
import { ProductFilterService } from '../../../services/product-filter.service';
import { ProductService } from '../../../services/product.service';
import { DeleteProductButtonComponent } from '../../buttons/delete-button/delete-product-button.component';
import { EditProductButtonComponent } from '../../buttons/edit-button/edit-product-button.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    EditProductButtonComponent,
    DeleteProductButtonComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];
  isLoading = false;
  hasError = false;
  filterFormSubscription?: Subscription;
  productSubscription?: Subscription;
  pageIndex = 0; // Índice da página
  pageSize = 8; // Tamanho da página
  maxLength?: number; // Quantidade total de produtos
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filter?: ProductFilter;

  constructor(
    private productService: ProductService,
    private productFilterService: ProductFilterService
  ) {
    this.filterFormSubscription = this.productFilterService
      .getFormGroup()
      .valueChanges.subscribe((res) => {
        this.filter = res as ProductFilter;
        this.pageIndex = res.page;
        this.pageSize = res.limit;
        this.loadProducts();
      });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.productSubscription = this.productService
      .getProductsUpdates()
      .subscribe((data) => {
        this.products = data.data;
        this.pageIndex = data.page;
        this.pageSize = data.limit;
        this.maxLength = data.length;
      });
  }

  ngOnDestroy(): void {
    this.filterFormSubscription?.unsubscribe();
    this.productSubscription?.unsubscribe();
  }

  onPageChange(event: PageEvent): void {
    const currentScrollPosition = window.scrollY;
    this.productFilterService.setPage(event.pageIndex);
    this.productFilterService.setLimit(event.pageSize);

    setTimeout(() => {
      window.scrollTo(0, currentScrollPosition);
    }, 0);
  }

  loadProducts(): void {
    this.isLoading = true;
    this.hasError = false;

    this.productService.getProducts(this.filter).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pageSize = res.limit;
        this.maxLength = res.length;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.hasError = true;
      },
    });
  }

  onSetList() {
    this.loadProducts();
  }
}
