import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductData } from '../../Services/product-data';
import { ProductService } from '../../Services/product.service';

@Component({
    selector: 'app-details',
    standalone: true,
    templateUrl: './details.component.html',
    styleUrl: './details.component.css',
    imports: [CommonModule, FooterComponent, RouterLink, NavbarComponent]
})
export class DetailsComponent {
  selectedProduct: ProductData | null = null;
  loading: boolean = false;
  selectedSize: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductService) { }


  ngOnInit(): void {

    this.getSelectedProduct();
  }

  getSelectedProduct() {
    this.selectedProduct = this.productService.getSelectedProduct();

  }

  changeBgColor(size: string) {
    this.selectedSize = size;
    alert('Selected Size: ' + this.selectedSize);
  }

  isSizeSelected(size: string): boolean {
    return this.selectedSize === size;
  }

}
