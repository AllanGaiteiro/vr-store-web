import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div *ngIf="isLoading" class="spinner-container">
      <mat-spinner></mat-spinner>
    </div>
  `,
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  @Input() isLoading?: boolean;
}
