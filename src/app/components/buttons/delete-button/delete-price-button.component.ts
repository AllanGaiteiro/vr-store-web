import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PriceService } from '../../../services/price.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-delete-price-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `<button *ngIf="id" class="delete-button" (click)="deletePrice(id)">
    <fa-icon [icon]="faTrash"></fa-icon>
  </button>`,
  styleUrl: './delete-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePriceButtonComponent {
  @Input() id?: number;
  faTrash = faTrash;
  constructor(private priceService: PriceService) {}

  deletePrice(id: number): void {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.priceService
        .deletePrice(id)
        .then(() => console.log('produto deletado com sucesso'));
    }
  }
}
