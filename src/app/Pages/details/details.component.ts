import { Component } from '@angular/core';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductData, cartProductData } from '../../Services/product-data';
import { ProductService } from '../../Services/product.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  imports: [CommonModule, FooterComponent, RouterLink, NavbarComponent],
})
export class DetailsComponent {
  selectedProduct!: ProductData;
  loading: boolean = false;
  selectedSize: string = '';
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.getSingleProduct();
  }

  getSingleProduct() {
    this.loading = true;
    this.productService
      .getSelectedProduct(this.id)
      .pipe(catchError(() => EMPTY))
      .subscribe((products) => {
        this.selectedProduct = products;
      });
  }

  onProductSelectedToCart(product: cartProductData): void {
    this.productService.setSelectedProductToCart(product);
  }


  changeBgColor(size: string) {
    this.selectedSize = size;
    alert('Selected Size: ' + this.selectedSize);
  }

  isSizeSelected(size: string): boolean {
    return this.selectedSize === size;
  }
}
