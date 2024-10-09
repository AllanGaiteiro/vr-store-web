import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="hasError" class="error-message">
      Ocorreu um erro ao carregar os produtos. Tente novamente.
    </div>
  `,
  styleUrl: './error-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorListComponent {
  @Input() hasError?: boolean;
}
