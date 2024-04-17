import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductData, cartProductData } from '../../Services/product-data';
import { Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { EMPTY, catchError, finalize } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  images = [
    '../../../../assets/images/shop-hero-1-product-slide-1.png',
    '../../../../assets/images/s1.jpg',
    '../../../../assets/images/s2.png',
    // Add more image paths as needed
  ];
  currentIndex = 0;

  
  products: ProductData[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  loading: boolean = false;


  constructor(private router:Router,private productService: ProductService){}

  ngOnInit(): void {
  this.getMenCategory()
  }

  getMenCategory(): void {
  this.loading = true;
  this.productService.getProducts()
  .pipe(
  catchError(() => EMPTY),
        // finalize(() => this.loading = false)
  )
  .subscribe(products => {
  this.products = products;
  this.loading = false;
  });
  }

  onProductSelectedToCart(product: cartProductData): void {
    // add product to cart
  this.productService.setSelectedProduct(product);
  }

  onProductSelectDetail(): void {
    // Navigate to the details page with the product ID as a parameter
  this.router.navigate(["/details"]);
  }

  

  nextPage(): void {
  if (this.hasNextPage()) {
  this.loading = true;
  this.currentPage++;
  this.getMenCategory();
  }
  }

  prevPage(): void {
  if (this.hasPreviousPage()) {
  this.loading = true;
  this.currentPage--;
  this.getMenCategory();
  }
  }

  hasNextPage(): boolean {
  return (this.currentPage * this.itemsPerPage) < this.products.length;
  }

  hasPreviousPage(): boolean {
  return this.currentPage > 1;
  }

  get paginationVisible(): boolean {
  return this.products.length > this.itemsPerPage;
  }

  get displayedProducts(): ProductData[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.products.slice(startIndex, endIndex);
  }


}
