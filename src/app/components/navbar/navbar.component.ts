import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AddButtonComponent } from '../buttons/add-button/add-button.component';
import { DeleteProductButtonComponent } from '../buttons/delete-button/delete-product-button.component';
import { SaveButtonComponent } from '../buttons/save-button/save-button.component';
import { BackButtonComponent } from '../buttons/back-button/back-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    AddButtonComponent,
    DeleteProductButtonComponent,
    SaveButtonComponent,
    BackButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() route?: 'produto' | 'cadastro' | '';
  @Input() id: number | null = null;
}
