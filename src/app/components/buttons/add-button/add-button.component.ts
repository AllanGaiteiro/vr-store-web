import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: ` <button class="add-button" (click)="addProduct()">
    <fa-icon [icon]="['fas', 'plus']"></fa-icon>
  </button>`,
  styleUrl: './add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButtonComponent {
  constructor(
    private router: Router,
    private library: FaIconLibrary,
  ) {
    this.library.addIcons(faPlus);
  }

  addProduct(): void {
    this.router.navigate(['/produto/cadastro']);
  }
}
