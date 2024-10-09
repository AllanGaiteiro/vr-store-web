import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PriceDialogComponent } from '../../price-dialog/price-dialog.component';
import { Price } from '../../../models/Price';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'; // Ícone de editar
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-edit-price-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <button *ngIf="price" class="edit-button" (click)="openPriceDialog()">
      <fa-icon [icon]="faEdit"></fa-icon>
    </button>
  `,
  styleUrl: './edit-button.component.scss',
  providers: [ToastService],
})
export class EditPriceButtonComponent {
  @Input() price?: Price;
  @Output() priceEdited = new EventEmitter<void>();
  faEdit = faEdit;
  constructor(
    private dialog: MatDialog,
    private toastService: ToastService,
  ) {}

  openPriceDialog() {
    const dialogRef = this.dialog.open(PriceDialogComponent, {
      width: '600px',
      disableClose: true,
      data: this.price,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.toastService.showSuccess('Loja adicionado com successo');
        this.priceEdited.emit();
      } else {
        this.toastService.showError('Erro ao adicionar uma nova loja');
      }
    });
  }
}
