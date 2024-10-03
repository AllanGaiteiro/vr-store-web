import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: ` <button class="add-button" (click)="addProduct()">Adicionar</button>`,
  styleUrl: './add-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddButtonComponent {
  constructor(private router: Router) {}

  addProduct(): void {
    this.router.navigate(['/produto/cadastro']);
  }
 }
