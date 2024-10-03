import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PriceDialogComponent } from '../../price-dialog/price-dialog.component';

@Component({
  selector: 'app-add-new-price-button',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  template: ` <button class="add-button" (click)="openNewPriceDialog()">
    Adicionar
  </button>`,

  styleUrl: './add-button.component.scss',
})
export class AddNewPriceButtonComponent {
  constructor(private dialog: MatDialog) {}

  openNewPriceDialog() {
    const dialogRef = this.dialog.open(PriceDialogComponent, {
      width: '600px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Preço adicionado:', result);
      }
    });
  }
}
