import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="notFound" class="no-products-message">
      <p>Nenhum produto encontrado.</p>
    </div>
  `,
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  @Input() notFound?: boolean;
}
