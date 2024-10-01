import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/Product.service';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button *ngIf="id" class="delete-button" (click)="deleteProduct(id)">
    Deletar
  </button>`,
  styleUrl: './delete-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteButtonComponent {
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
