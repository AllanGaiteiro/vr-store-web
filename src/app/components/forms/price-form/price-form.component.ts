import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '../../../models/Store';

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
