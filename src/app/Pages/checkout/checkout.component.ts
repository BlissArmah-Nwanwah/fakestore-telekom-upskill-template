import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NavbarComponent,MatButtonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

}
