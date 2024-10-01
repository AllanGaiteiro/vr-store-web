import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { AddButtonComponent } from '../button/add-button/add-button.component';
import { DeleteButtonComponent } from '../button/delete-button/delete-button.component';
import { SaveButtonComponent } from "../button/save-button/save-button.component";
import { BackButtonComponent } from "../button/back-button/back-button.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AddButtonComponent, DeleteButtonComponent, SaveButtonComponent, BackButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Input() route?: 'produto' | 'cadastro' | '';
  @Input() id: number | null = null;
}
