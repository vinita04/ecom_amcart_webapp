import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:categoryId', component: CategoryComponent },
  { path: 'category/:categoryId/:subcategoryId', component: CategoryComponent },
  { path: 'product/:productId', component: ProductComponent },
  //{ path: 'error', component: ErrorHandlerComponent },
  { path: '**', redirectTo: '/error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
