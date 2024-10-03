import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PriceService } from '../../../services/price.service';

@Component({
  selector: 'app-delete-price-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button *ngIf="id" class="delete-button" (click)="deletePrice(id)">
    Deletar
  </button>`,
  styleUrl: './delete-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePriceButtonComponent {
  @Input() id?: number;
  constructor(private priceService: PriceService) {}

  deletePrice(id: number): void {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.priceService
        .deletePrice(id)
        .then(() => console.log('produto deletado com sucesso'));
    }
  }
}
