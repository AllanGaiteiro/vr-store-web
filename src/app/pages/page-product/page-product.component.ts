import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductService } from '../../services/Product.service';
import { ProductFormService } from '../../services/product-form.service';

@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    ProductFormComponent,
  ],
  templateUrl: './page-product.component.html',
  styleUrl: './page-product.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageProductComponent implements OnInit, OnDestroy {
  prodId?: number;
  routeSubscription?: Subscription;
  producSubscription?: Subscription;
  runProduct = true;
  imgDefault =
    'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg';
  constructor(
    private activatedRoute: ActivatedRoute,
    private producService: ProductService,
    private productFormService: ProductFormService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.runProduct = true;
        if (params['id'] === null || params['id'] === undefined) {
          this.runProduct = false;
          console.log('Page Product Cadastro');
        } else {
          console.log('Page Product Edite');
          this.prodId = Number(params['id']);
          if (this.prodId) this.observeProduct(this.prodId);
        }
      },
      error: () => this.runProduct = false,
    });
  }

  private observeProduct(prodId: number) {
    this.producSubscription = this.producService.getProduct(prodId).subscribe({
      next: (res) => {
        this.productFormService.setProduct(res);
      },
      complete: () => (this.runProduct = false),
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.producSubscription?.unsubscribe();

  }
}
