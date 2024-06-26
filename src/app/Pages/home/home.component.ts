import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { ProductData, cartProductData } from '../../Services/product-data';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {
  MatSnackBarModule,
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ItemCardComponent } from '../../components/item-card/item-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    NavbarComponent,
    ItemCardComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSnackBarModule,
  ],
})
export class HomeComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  searchForm!: FormGroup;
  products: ProductData[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  loading: boolean = false;
  productLength: number = 0;
  durationInSeconds = 2;

  constructor(
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.allProduct();
    this.searchForm = this.formBuilder.group({
      searchTerm: [''],
    });

    this.searchForm
      .get('searchTerm')
      ?.valueChanges.pipe(
        debounceTime(300), // Debounce for 300 milliseconds
        distinctUntilChanged() // Only emit if the value has changed
      )
      .subscribe(() => {
        this.searchProducts();
      });
  }

  allProduct(): void {
    this.loading = true;
    this.productService
      .getProducts()
      .pipe(catchError(() => EMPTY))
      .subscribe((products) => {
        this.products = products;
        this.productLength = Math.ceil(products.length / 8);
        this.loading = false;
      });
  }

  onProductSelectedToCart(product: cartProductData): void {
    this.productService.setSelectedProductToCart(product);
    this.openSnackBar('Item added to cart', 'Close')
  }

  onProductSelectDetail(product: cartProductData): void {
    this.productService.setSelectedProduct(product);
    this.router.navigate(['/details', product.id]);
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
  }

  get paginationVisible(): boolean {
    return this.products.length > this.itemsPerPage;
  }

  get displayedProducts(): ProductData[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  searchProducts(): void {
    const searchTerm = this.searchForm.value.searchTerm.trim().toLowerCase();

    if (searchTerm === '') {
      // Reset products to all products when search term is empty
      this.allProduct();
    } else {
      this.products = this.products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
    }

    this.currentPage = 1;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
