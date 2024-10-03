import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ProductFilterComponent } from '../../product-filter/product-filter.component';
import { ProductListComponent } from '../../lists/product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-page-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,     
    NavbarComponent,
    ProductFilterComponent,
    ProductListComponent,
  ],
  templateUrl: './page-product-list.component.html',
  styleUrls: ['./page-product-list.component.scss'],
})
export class PageProductListComponent {}
