import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductData } from '../../Services/product-data';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() product!: ProductData
  @Output() productSelectDetail = new EventEmitter<ProductData>()
  @Output() productAddToCart = new EventEmitter<ProductData>()

  constructor(){}

  onViewDetails(): void {
    this.productSelectDetail.emit(this.product)
  }

  onProductSelectedToCart(): void {
    this.productAddToCart.emit(this.product)
  }

}
