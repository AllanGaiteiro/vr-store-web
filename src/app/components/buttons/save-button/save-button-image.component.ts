import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { ProductFormService } from '../../../services/product-form.service';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-save-button-image',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `<button class="save-button" type="submit" [disabled]="disabled">
    <fa-icon [icon]="['fas', 'save']"></fa-icon>
  </button>`,
  styleUrl: './save-button.component.scss',
})
export class SaveButtonImageComponent {
  @Input() disabled?: boolean;
  constructor(private library: FaIconLibrary) {
    this.library.addIcons(faSave);
  }
}
