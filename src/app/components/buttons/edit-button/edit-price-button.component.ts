import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PriceDialogComponent } from '../../price-dialog/price-dialog.component';
import { Price } from '../../../models/Price';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Ícone de editar

@Component({
  selector: 'app-edit-price-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule,],
  template: `
    <button *ngIf="price" class="edit-button" (click)="openPriceDialog()">
      <fa-icon [icon]="faEdit"></fa-icon>
    </button>
  `,
  styleUrl: './edit-button.component.scss',
})
export class EditPriceButtonComponent {
  @Input() price?: Price;
  @Output() priceEdited = new EventEmitter<void>();
  faEdit = faEdit;
  constructor(private dialog: MatDialog) {}

  openPriceDialog() {
    const dialogRef = this.dialog.open(PriceDialogComponent, {
      width: '600px',
      disableClose: true,
      data: this.price,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Preço adicionado:', result);
        this.priceEdited.emit();

      }
    });
  }
}
