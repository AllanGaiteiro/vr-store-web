import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '../../../models/Store';
import { Price } from '../../../models/Price';
import { PriceFormService } from '../../../services/price-form.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-price-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.scss'],
})
export class PriceFormComponent {
  @Input() priceForm!: FormGroup;
  @Input() stores?: Store[]; // Recebe a lista de lojas do componente pai

  compareStores = (store1: Store, store2: Store): boolean => {
    return store1 && store2 ? store1.id === store2.id : store1 === store2;
  };
}
