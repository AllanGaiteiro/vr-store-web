import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/Product.service';
import { Router } from '@angular/router';
import { ProductFormService } from '../../../services/product-form.service';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button class="save-button" (click)="saveProduct()">
    Salvar
  </button>`,
  styleUrl: './save-button.component.scss',
})
export class SaveButtonComponent {
  constructor(
    private router: Router,
    private productFormService: ProductFormService,
    private productService: ProductService
  ) {}

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
      this.productService.updateProduct(productData).then((res) => {
        console.log('update product');
      });
    }
  }
}
