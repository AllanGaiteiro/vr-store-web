import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-product-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <button *ngIf="id" class="edit-button" (click)="editProduct(id)">
      <fa-icon [icon]="faEdit"></fa-icon>
    </button>
  `,
  styleUrl: './edit-button.component.scss',
})
export class EditProductButtonComponent {
  @Input() id?: number;
  faEdit = faEdit;

  constructor(private router: Router) {}

  editProduct(id: number): void {
    this.router.navigate(['/produto/cadastro', id]);
  }
}
