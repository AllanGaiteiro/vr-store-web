import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from '../../forms/product-form/product-form.component';
import { ProductService } from '../../../services/product.service';
import { ProductFormService } from '../../../services/product-form.service';
import { PriceListComponent } from '../../lists/price-list/price-list.component';

@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    ProductFormComponent,
    PriceListComponent,
  ],
  templateUrl: './page-product.component.html',
  styleUrl: './page-product.component.scss',
})
export class PageProductComponent implements OnInit, OnDestroy {
  prodId: number | null = null;
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
          this.prodId = null;
          this.productFormService.resetProduct();
        } else {
          console.log('Page Product Edite');
          this.prodId = Number(params['id']);
          if (this.prodId) this.observeProduct(this.prodId);
        }
      },
      error: () => (this.runProduct = false),
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

  getImage() {
    return (
      this.productFormService.getProduct()?.image ||
      'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg'
    );
  }
}
