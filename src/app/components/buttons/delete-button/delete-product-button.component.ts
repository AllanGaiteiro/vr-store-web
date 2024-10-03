import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-delete-product-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button
    *ngIf="id"
    class="delete-button"
    (click)="deleteProduct(id)"
  >
    Deletar
  </button>`,
  styleUrl: './delete-button.component.scss',

})
export class DeleteProductButtonComponent {
  @Input() id?: number;
  constructor(private productService: ProductService) {}

  deleteProduct(productId: number): void {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.productService
        .deleteProduct(productId)
        .then(() => console.log('produto deletado com sucesso'));
    }
  }
}
