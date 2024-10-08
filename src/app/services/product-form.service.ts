import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductFormService {
  private formGroup!: FormGroup;
  product!: Product | null;

  constructor(private fb: FormBuilder) {
    this.createProductForm();
  }

  createProductForm(): void {
    this.formGroup = this.fb.group({
      id: [null],
      description: [null],
      cost: [null],
      image: [null],
    });
  }

  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  getProduct(): Product | null {
    return this.product;
  }

  setProduct(product: Product): void {
    if (!this.formValuesEqual(product)) {
      this.product = product;
      this.updateFormValues();
    }
  }

  resetProduct() {
    this.product = null;
    this.createProductForm();
  }

  updateFormValues(): void {
    if (this.product) {
      this.formGroup.patchValue({
        id: this.product.id ?? null,
        description: this.product.description ?? null,
        cost: this.product.cost
          ? Number(Number(this.product.cost).toFixed(2))
          : null,
        image: this.product.image ? this.product.image : null,
      });
    }
  }

  formValuesEqual(values: Partial<Product>): boolean {
    const currentProduct = this.getProduct();
    return (
      //currentProduct.id === values.id &&
      currentProduct?.description === values.description &&
      currentProduct?.cost === values.cost
      // && currentProduct?.image === values?.image
    );
  }
}
