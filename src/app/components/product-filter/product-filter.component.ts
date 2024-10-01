import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ProductFilterService } from '../../services/product-filter.service';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.scss',
})
export class ProductFilterComponent {
  filterForm?: FormGroup;

  constructor(private productFilterService: ProductFilterService) {
    this.filterForm = this.productFilterService.getFormGroup();
  }

  resetFilters() {
    this.filterForm?.reset();
  }
}
