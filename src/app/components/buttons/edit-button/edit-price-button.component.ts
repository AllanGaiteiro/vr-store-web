import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PriceDialogComponent } from '../../price-dialog/price-dialog.component';
import { Price } from '../../../models/Price';

@Component({
  selector: 'app-edit-price-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button *ngIf="price" class="edit-button" (click)="openPriceDialog()">
      Editar
    </button>
  `,
  styleUrl: './edit-button.component.scss',
})
export class EditPriceButtonComponent {
  @Input() price?: Price;
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
      }
    });
  }
}
