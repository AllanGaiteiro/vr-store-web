import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductService } from '../../../services/Product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button class="save-button" (click)="saveProduct()">
    Salvar
  </button>`,
  styleUrl: './save-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveButtonComponent {
  constructor(private productService: ProductService, private router: Router) {}
  saveProduct(): void {
    console.log('save');
  }

  onSave(): void {
    const productData = this.productService.product;

    if (!productData) {
      return;
    }
    this.productService.createProduct(productData).subscribe((res) => {
      this.router.navigate(['/produto/cadastro', res.id]);
    });
  }
}
