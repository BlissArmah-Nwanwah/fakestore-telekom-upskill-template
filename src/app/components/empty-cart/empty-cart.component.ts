import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-empty-cart',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.css'
})
export class EmptyCartComponent {

}
