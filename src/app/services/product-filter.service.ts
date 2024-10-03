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
      page: [0],
      limit: [10],
      id: [null],
      description: [null],
      cost: [null],
      price: [null],
      costOperator: ['<='],
      priceOperator: ['<='],
    });
  }

  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  setPage(pageIndex: number) {
    if (this.formGroup.get('page')?.value !== pageIndex) {
      this.formGroup.get('page')?.setValue(pageIndex);
    }
  }
  setLimit(pageSize: number) {
    if (this.formGroup.get('limit')?.value !== pageSize) {
      this.formGroup.get('limit')?.setValue(pageSize);
    }
  }
}
