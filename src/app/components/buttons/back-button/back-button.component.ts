import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<button class="save-button" (click)="onBack()">Voltar</button>`,
  styleUrl: './back-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  constructor(
    private router: Router,
  ) {}
  onBack(): void {
    this.router.navigate(['/produto']);
  }
 }
