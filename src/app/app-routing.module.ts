import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { ProductUpsertComponent } from "./products/product-upsert/product-upsert.component";
import { ProductComponent } from "./products/product/product.component";
import { NotFoundComponent } from "./core/not-found/not-found.component";
import { UserAuthComponent } from "./user/user-auth/user-auth.component";
import { authGuard } from "./_guards/auth.guard";

const appRoutes: Routes = [
    
    {
      path: 'user-auth',
      component: UserAuthComponent
    },
    {
    
    path: '',
    component: HomeComponent
  },
  {
    path: 'product-upsert',
    component: ProductUpsertComponent
  },
  {
    path: 'product-upsert/:id',
    component: ProductUpsertComponent
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    canActivate:[authGuard]
  }
  ,
  {
    path: 'not-found',
    component: NotFoundComponent
  }
  ,
  {
    path: '**',
    component: NotFoundComponent
  }
  ]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}