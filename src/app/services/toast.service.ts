import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Success', {
      duration: duration,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showError(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Error', {
      duration: duration,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  show(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Closed', {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
