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
import { ToastService } from '../../../services/toast.service';
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
    private library: FaIconLibrary,
    private toastService: ToastService
  ) {
    this.library.addIcons(faSave);
  }

  async saveProduct() {
    const productData = this.productFormService.getProduct();
    if (!productData) return;
    if (!productData?.id) {
      try {
        const res = await this.productService.createProduct(productData);
        if (!res) {
          throw new Error('Response return  null/undefined');
        }
        this.toastService.showSuccess('Creado com sucesso');
        this.router.navigate(['/produto/cadastro', res.id]);
      } catch (error) {
        this.toastService.showError('Erro ao tentar criar produto');
        console.error('Erro ao tentar criar produto', error);
      }
    } else {
      try {
        await this.productService
        .updateProduct(productData.id, productData);
        this.toastService.showSuccess('Atualizado com sucesso');

      } catch (error) {
        this.toastService.showError('Erro ao tentar atualizar');
        console.error('Erro ao tentar atualizar', error); 
      }
    }
  }
}
