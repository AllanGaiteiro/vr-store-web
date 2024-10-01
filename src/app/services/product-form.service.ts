import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductFormService {
  private formGroup!: FormGroup;
  product!: Product;

  constructor(private fb: FormBuilder) {
    this.createProductForm();
  }

  private createProductForm(): void {
    this.formGroup = this.fb.group({
      id: ['CODIGO AUTOMATICO'],
      description: [null],
      cost: [null],
      image: [null],
    });
  }

  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  getProduct(): Product {
    return this.product;
  }

  setProduct(product: Product): void {
    if (!this.formValuesEqual(product)) {
      this.product = product;
      this.updateFormValues();
    }
  }

  updateFormValues(): void {
    if (this.product) {
      this.formGroup.patchValue({
        id: this.product.id || 'CODIGO AUTOMATICO',
        description: this.product.description,
        cost: this.product.cost,
        image: this.product.image,
      });
    }
  }

  formValuesEqual(values: Partial<Product>): boolean {
    const currentProduct = this.getProduct();
    return (
      //currentProduct.id === values.id &&
      currentProduct?.description === values?.description &&
      currentProduct?.cost === values?.cost
      // && currentProduct?.image === values?.image
    );
  }
}
