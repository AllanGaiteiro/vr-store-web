import { Routes } from '@angular/router';
import { PageProductListComponent } from './pages/page-product-list/page-product-list.component';
import { PageProductComponent } from './pages/page-product/page-product.component';

export const routes: Routes = [
    { path: '', redirectTo: '/produto', pathMatch: 'full' },
    { path: 'produto',
      children: [
        { path: '',component: PageProductListComponent },
        { path: 'cadastro',component: PageProductComponent },
        { path: 'cadastro/:id', component: PageProductComponent },
      ]
    },
  ];