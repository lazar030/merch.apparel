import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'men', loadChildren: () => import('./pages/men/men.module').then(m => m.MenPageModule) },
  { path: 'kids', loadChildren: () => import('./pages/kids/kids.module').then(m => m.KidsPageModule) },
  { path: 'women', loadChildren: () => import('./pages/women/women.module').then(m => m.WomenPageModule) },
  { path: 'organic', loadChildren: () => import('./pages/organic/organic.module').then( m => m.OrganicPageModule) },
  { path: 'accessories', loadChildren: () => import('./pages/accessories/accessories.module').then(m => m.AccessoriesPageModule) },
  { path: 'image/:id', loadChildren: () => import('./pages/image/image.module').then(m => m.ImagePageModule) },
  { path: 'product/:category_name/:id', loadChildren: () => import('./pages/product/product.module').then(m => m.ProductPageModule) },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
