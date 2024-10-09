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
import { ImageUploadComponent } from '../../image-upload/image-upload.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    ProductFormComponent,
    PriceListComponent,
    ImageUploadComponent,
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
  productImage: string | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private producService: ProductService,
    private productFormService: ProductFormService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.runProduct = true;
        const id = params['id'];
        if (id === null || id === undefined) {
          this.runProduct = false;
          console.log('Page Product Cadastro');
          this.prodId = null;
          this.productFormService.resetProduct();
        } else {
          console.log('Page Product Edite');
          this.prodId = Number(id);
          if (this.prodId) this.observeProduct(this.prodId);
        }
      },
      error: () => (this.runProduct = false),
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.producSubscription?.unsubscribe();
  }

  private observeProduct(prodId: number) {
    this.producSubscription = this.producService.getProduct(prodId).subscribe({
      next: (res) => {
        this.productFormService.setProduct(res);
        this.productImage = res?.image ?? null;
      },
      complete: () => (this.runProduct = false),
    });
  }
  async onImageUrlChange(newImageUrl: string): Promise<void> {
    try {
      if (this.prodId) {
        await this.producService.updateProduct(this.prodId, {
          image: newImageUrl,
        });
        this.productImage = newImageUrl;
        this.toastService.showSuccess('Imagem do produto alterada com sucesso');
      } else {
        const product = this.productFormService.getProduct();
        if (product) {
          product.image = newImageUrl;
          this.productImage = newImageUrl;
          this.productFormService.setProduct(product);
        }
      }
    } catch (error) {
      this.toastService.showError('Erro ao alterar a Imagem do produto');
      console.error('Erro ao alterar a Imagem do produto', error);
    }
  }
  getImage() {
    return this.productImage ?? this.imgDefault;
  }
}
