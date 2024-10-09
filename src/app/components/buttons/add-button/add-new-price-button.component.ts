import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PriceDialogComponent } from '../../price-dialog/price-dialog.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../../../services/toast.service';

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
  @Input() productId?: number | null = null;
  @Output() priceAdded = new EventEmitter<void>();

  constructor(
    private dialog: MatDialog,
    private library: FaIconLibrary,
    private toastService: ToastService,
  ) {
    this.library.addIcons(faPlus);
  }

  openNewPriceDialog() {
    const dialogRef = this.dialog.open(PriceDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { productId: this.productId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toastService.showSuccess('Loja adicionada com sucesso');
        this.priceAdded.emit();
      } else {
        this.toastService.showError('Erro ao adicionar uma Loja');
      }
    });
  }
}
