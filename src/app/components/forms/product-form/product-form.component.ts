import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductFormService } from '../../../services/product-form.service';
import { Product } from '../../../models/Product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  productSubscription?: Subscription;
  product!: Product;

  constructor(private productFormService: ProductFormService) {}

  ngOnInit(): void {
    this.productForm = this.productFormService.getFormGroup();
    this.productSubscription = this.productFormService
      .getFormGroup()
      .valueChanges.subscribe((res) => this.productFormService.setProduct(res));
  }

  ngOnDestroy(): void {
    this.productSubscription?.unsubscribe();
  }
}
