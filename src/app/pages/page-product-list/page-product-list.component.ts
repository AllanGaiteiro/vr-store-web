import { Component, OnInit } from '@angular/core';
import { Product, ProductFilter } from '../../models/Product';
import { ProductService } from '../../services/Product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { EditButtonComponent } from '../../components/button/edit-button/edit-button.component';
import { DeleteButtonComponent } from '../../components/button/delete-button/delete-button.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductFilterComponent } from '../../components/product-filter/product-filter.component';

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

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(filter?: any): void {
    this.productService.getProducts(filter).subscribe((data) => {
      this.products = data;
    });
  }

  applyFilters(filterValues: Partial<ProductFilter>): void {
    this.loadProducts(filterValues);
  }
}
