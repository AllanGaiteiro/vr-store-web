import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { PriceService } from './services/price.service';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[ProductService,PriceService,StoreService]
})
export class AppComponent {
  title = 'vr-store-web';
}
