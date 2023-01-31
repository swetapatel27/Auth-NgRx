import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {AuthService } from './services/auth.service';
import { AuthEffects } from './store/effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/auth.reducers';
import {HttpClientModule} from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { ProductReducer } from './store/reducers/product.reducer';
import { ProductEffects } from './store/effects/product.effect';
import { ProductsComponent } from './products/products.component';
import { TestProductComponent } from './test-product/test-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    TestComponent,
    ProductsComponent,
    TestProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forFeature('auth',reducer),
    StoreModule.forFeature('Product',ProductReducer),
    EffectsModule.forRoot([AuthEffects,ProductEffects]),
    StoreModule.forRoot(reducer, {}),
    StoreModule.forRoot(ProductReducer,{}),
  ],
  
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
