import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductUpsertComponent } from './products/product-upsert/product-upsert.component';
import { ProductComponent } from './products/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsCardDirectives } from './directives/bs-card.directive';
import { ProductService } from './_services/product.service';
import { ProductsComponent } from './products/products.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { HomeComponent } from './core/home/home.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroComponent } from './core/hero/hero.component';
import { CardStyleDirective } from './directives/card-style.directive';
import { UserAuthComponent } from './user/user-auth/user-auth.component';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './_interceptor/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { errorInterceptor } from './_interceptor/error.interceptor';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { MainComponent } from './core/main/main.component';
import { FooterComponent } from './core/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductUpsertComponent,
    ProductComponent,
    BsCardDirectives,
    ProductsComponent,
    ProductCardComponent,
    HomeComponent,
    NavbarComponent,
    NotFoundComponent,
    HeroComponent,
    CardStyleDirective,
    UserAuthComponent,
    SpinnerComponent,
    MainComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    AppRoutingModule, 
    ReactiveFormsModule, 
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton:true,
      positionClass:'toast-bottom-right'
    })
  ],
  providers: [ProductService, provideHttpClient(withInterceptors([authInterceptor,errorInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
