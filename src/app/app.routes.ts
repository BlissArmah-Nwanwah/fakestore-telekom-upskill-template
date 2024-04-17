import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { DetailsComponent } from './Pages/details/details.component';
import { CartComponent } from './Pages/cart/cart.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';
import { CheckoutComponent } from './Pages/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'empty-cart', component: EmptyCartComponent },
  { path: 'checkout', component: CheckoutComponent },
];
