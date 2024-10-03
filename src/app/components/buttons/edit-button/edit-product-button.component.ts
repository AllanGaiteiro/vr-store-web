import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button *ngIf="id" class="edit-button" (click)="editProduct(id)">
      Editar
    </button>
  `,
  styleUrl: './edit-button.component.scss',
})
export class EditProductButtonComponent {
  @Input() id?: number;
  constructor(private router: Router) {}

  editProduct(id: number): void {
    this.router.navigate(['/produto/cadastro', id]);
  }
}
