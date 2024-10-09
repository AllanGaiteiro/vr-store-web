import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `<button class="back-button" (click)="onBack()">
    <fa-icon [icon]="['fas', 'arrow-left']"></fa-icon>
  </button>`,
  styleUrl: './back-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  constructor(
    private router: Router,
    private library: FaIconLibrary,
  ) {
    this.library.addIcons(faArrowLeft);
  }
  onBack(): void {
    this.router.navigate(['/produto']);
  }
}
