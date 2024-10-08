import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { ToastService } from '../../services/toast.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreService } from '../../services/store.service';
import { PriceService } from '../../services/price.service';
import { Price } from '../../models/Price';
import { Store } from '../../models/Store';
import { PriceFormComponent } from '../forms/price-form/price-form.component';
import { PriceFormService } from '../../services/price-form.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-price-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    PriceFormComponent,
  ],
  templateUrl: './price-dialog.component.html',
  styleUrls: ['./price-dialog.component.scss'],
  providers: [ToastService, PriceService, StoreService],
})
export class PriceDialogComponent implements OnInit {
  priceForm!: FormGroup;
  stores?: Store[];
  isEditMode = false;

  constructor(
    private dialogRef: MatDialogRef<PriceDialogComponent>,
    private toastService: ToastService,
    private priceService: PriceService,
    private storeService: StoreService,
    private priceFormService: PriceFormService,
    @Inject(MAT_DIALOG_DATA) public data: Price | null
  ) {
    this.priceForm = this.priceFormService.getFormGroup();
  }

  ngOnInit(): void {
    this.storeService.getStores().subscribe((res) => {
      this.stores = res.sort((a, b) =>
        a.description > b.description ? 1 : -1
      );
    });

    if (this.data?.id) {
      this.isEditMode = true;
      this.priceFormService.updateFormValues({
        store: this.data.store,
        priceValue: this.data.priceValue,
      });
    }
  }

  onNoClick(): void {
    this.priceForm.reset();
    this.dialogRef.close();
  }

  save(): void {
    if (this.priceForm.valid) {
      const price = { ...this.data, ...this.priceForm.value };

      if (this.isEditMode) {
        this.priceService.updatePrice(price).then((res) => {
          this.priceForm.reset();
          this.dialogRef.close(res);
        });
      } else {
        this.priceService.createPrice(price).then((res) => {
          this.priceForm.reset();
          this.dialogRef.close(res);
        });
      }
    } else {
      this.toastService.show(
        'Um ou mais campos obrigatórios não foram preenchidos corretamente.'
      );
    }
  }
}
