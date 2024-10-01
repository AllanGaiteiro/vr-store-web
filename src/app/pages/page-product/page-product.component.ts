import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductService } from '../../services/Product.service';

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
  routeSub?: Subscription;
  producSubscription?: Subscription;
  runProduct = true;
  imgDefault =
    'https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg';
  constructor(
    private activatedRoute: ActivatedRoute,
    private producService: ProductService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe({
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
      next: (res) => (this.producService.product = res),
      complete: () => (this.runProduct = false),
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.producSubscription) {
      this.producSubscription.unsubscribe();
    }
  }
}
