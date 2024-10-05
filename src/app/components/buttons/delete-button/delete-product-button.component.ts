import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-delete-product-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `<button
    *ngIf="id"
    class="delete-button"
    (click)="deleteProduct(id)"
  >
    <fa-icon [icon]="faTrash"></fa-icon>
  </button>`,
  styleUrl: './delete-button.component.scss',
})
export class DeleteProductButtonComponent {
  @Input() id?: number;
  @Output() deleted = new EventEmitter<void>();
  faTrash = faTrash;

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastService: ToastService
  ) {}

  deleteProduct(productId: number): void {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.productService
        .deleteProduct(productId)
        .then(() => {
          this.toastService.showSuccess('produto deletado com sucesso');
          this.deleted.emit();
          this.router.navigate(['/produto']);
        })
        .catch((error) => {
          this.toastService.showError('Erro ao tentar deletar o produto');
        });
    }
  }
}
