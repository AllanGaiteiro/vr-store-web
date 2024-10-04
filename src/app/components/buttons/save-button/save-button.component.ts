import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { ProductFormService } from '../../../services/product-form.service';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `<button class="save-button" (click)="saveProduct()">
    <fa-icon [icon]="['fas', 'save']"></fa-icon>
  </button>`,
  styleUrl: './save-button.component.scss',
})
export class SaveButtonComponent {
  constructor(
    private router: Router,
    private productFormService: ProductFormService,
    private productService: ProductService,
    private library: FaIconLibrary
  ) {
    this.library.addIcons(faSave);
  }

  saveProduct(): void {
    const productData = this.productFormService.getProduct();
    if (!productData) return;
    if (!productData?.id) {
      this.productService.createProduct(productData).then((res) => {
        if (res) {
          this.router.navigate(['/produto/cadastro', res.id]);
        }
      });
    } else {
      this.productService
        .updateProduct(productData.id, productData)
        .then((res) => {
          console.log('update product');
        });
    }
  }
}
