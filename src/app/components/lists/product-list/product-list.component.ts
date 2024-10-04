import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/Product';
import { ProductFilter } from '../../../models/ProductFilter';
import { ProductFilterService } from '../../../services/product-filter.service';
import { ProductService } from '../../../services/product.service';
import { DeleteProductButtonComponent } from '../../buttons/delete-button/delete-product-button.component';
import { EditProductButtonComponent } from '../../buttons/edit-button/edit-product-button.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { ErrorListComponent } from '../../error-list/error-list.component';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    EditProductButtonComponent,
    DeleteProductButtonComponent,
    SpinnerComponent,
    NotFoundComponent,
    ErrorListComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  products: Product[] = [];
  isLoading = false;
  hasError = false;
  pageIndex = 0;
  pageSize = 10;
  maxLength?: number;
  filter!: ProductFilter;
  dataSource: MatTableDataSource<Product>;

  filterFormSubscription?: Subscription;
  productSubscription?: Subscription;
  sortBy: string = 'product.description';
  sortOrder: string = 'ASC';

  constructor(
    private productService: ProductService,
    private productFilterService: ProductFilterService
  ) {
    this.dataSource = new MatTableDataSource(this.products);

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
  }

  ngOnDestroy(): void {
    this.filterFormSubscription?.unsubscribe();
    this.productSubscription?.unsubscribe();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.hasError = false;
    this.productService
      .getProducts({
        ...this.filter,
        page: this.pageIndex,
        limit: this.pageSize,
        sortBy: this.sortBy,
        sortOrder: this.sortOrder,
      })
      .subscribe({
        next: (res) => {
          this.dataSource.data = res.data;
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

  onPageChange(event: PageEvent): void {
    this.productFilterService.setPage(event.pageIndex);
    this.productFilterService.setLimit(event.pageSize);
  }

  changeSort(field: string) {
    if (this.sortBy === field) {
      this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortBy = field;
      this.sortOrder = 'ASC';
    }
    this.loadProducts();
  }
}
