import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductFilter } from '../../models/ProductFilter';
import { ProductService } from '../../services/Product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { EditButtonComponent } from '../../components/button/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../../components/button/delete-button/delete-button.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductFilterComponent } from '../../components/product-filter/product-filter.component';
import { ProductFilterService } from '../../services/product-filter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    NavbarComponent,
    ProductFilterComponent,
    EditButtonComponent,
    DeleteButtonComponent,
  ],
  templateUrl: './page-product-list.component.html',
  styleUrls: ['./page-product-list.component.scss'],
})
export class PageProductListComponent implements OnInit {
  products: Product[] = [];
  filterFormSubscription?: Subscription;
  productSubscription?: Subscription;

  constructor(
    private productService: ProductService,
    private productFilterService: ProductFilterService
  ) {
    this.filterFormSubscription = this.productFilterService
      .getFormGroup()
      .valueChanges.subscribe((res) => {
        this.loadProducts(res);
      });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.filterFormSubscription?.unsubscribe();
    this.productSubscription?.unsubscribe();
  }

  loadProducts(filter?: ProductFilter): void {
    this.productSubscription = this.productService
      .getProducts(filter)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
