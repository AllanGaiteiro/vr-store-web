import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductFilterComponent } from '../../components/product-filter/product-filter.component';
import { ProductListComponent } from '../../components/product-list/product-list.component';
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
