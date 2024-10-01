import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button *ngIf="id" class="edit-button" (click)="editProduct(id)">
      Editar
    </button>
  `,
  styleUrl: './edit-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditButtonComponent {
  @Input() id?: number;
  constructor(private router: Router) {}

  editProduct(id: number): void {
    this.router.navigate(['/produto/cadastro', id]);
  }
}
