import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Price } from '../models/Price';

@Injectable({
  providedIn: 'root',
})
export class PriceFormService {
  private formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createPriceForm();
  }

  createPriceForm() {
    this.formGroup = this.fb.group({
      store: [null, Validators.required],
      priceValue: [
        null,
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
    });
  }

  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  updateFormValues(price: Partial<Price>): void {
    this.formGroup.patchValue({
      store: price.store || null,
      priceValue: price.priceValue || null,
    });
  }

  formValuesEqual(price: Partial<Price>): boolean {
    const currentPrice = this.formGroup.getRawValue();
    return (
      currentPrice?.store?.id === price?.store?.id &&
      currentPrice?.priceValue === price?.priceValue
    );
  }
}
