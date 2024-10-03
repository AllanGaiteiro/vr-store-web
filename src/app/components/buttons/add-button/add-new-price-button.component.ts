import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PriceDialogComponent } from '../../price-dialog/price-dialog.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-new-price-button',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FontAwesomeModule],
  template: ` <button class="add-button" (click)="openNewPriceDialog()">
    <fa-icon [icon]="['fas', 'plus']"></fa-icon>
  </button>`,

  styleUrl: './add-button.component.scss',
})
export class AddNewPriceButtonComponent {
  constructor(private dialog: MatDialog, private library: FaIconLibrary) {
    this.library.addIcons(faPlus);
  }

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
