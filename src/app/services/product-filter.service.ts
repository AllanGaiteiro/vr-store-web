import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProductFilterService {
  private formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createFilterForm();
  }

  private createFilterForm(): void {
    this.formGroup = this.fb.group({
      id: [null],
      description: [null],
      cost: [null],
      price: [null],
    });
  }

  getFormGroup(): FormGroup {
    return this.formGroup;
  }
}
