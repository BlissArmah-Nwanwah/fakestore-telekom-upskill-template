import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, count, map, of, throwError } from 'rxjs';
import { ProductData, cartProductData } from './product-data';

// Declare the 'google' object
declare const google: any;
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private selectedProductKey = 'selectedProduct';
  private productCountKey = 'productCount';
  private cartProductsKey = 'cartProducts';

  selectedProduct: ProductData | null = null;
  cartProducts: cartProductData[] = [];

  productCount: number = 0;
  activeButton: string = '';

  private apiurl = "https://fakestoreapi.com/products"



  constructor(private http: HttpClient) {
  this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedProduct = localStorage.getItem(this.selectedProductKey);
    if (storedProduct) {
      this.selectedProduct = JSON.parse(storedProduct);
    }

    const storedCartProducts = localStorage.getItem(this.cartProductsKey);
    if (storedCartProducts) {
      this.cartProducts = JSON.parse(storedCartProducts);
    }

    
    
    const storedProductCount = localStorage.getItem(this.productCountKey);
    if (storedProductCount) {
      this.productCount = JSON.parse(storedProductCount);
    }
  }


  private updateLocalStorage(): void {
    localStorage.setItem(this.selectedProductKey, JSON.stringify(this.selectedProduct));
    localStorage.setItem(this.cartProductsKey, JSON.stringify(this.cartProducts));
    localStorage.setItem(this.productCountKey, JSON.stringify(this.productCount));
  }


  getProducts(): Observable<ProductData[]> {
    return this.http.get<ProductData[]>(this.apiurl);
  }


  setSelectedProduct(product: ProductData): void {
    this.selectedProduct = product;
    this.updateLocalStorage();
  }

  setSelectedProductToCart(product: cartProductData): void {
    const existingProductIndex = this.cartProducts.findIndex(p => p.id === product.id);
  
    if (existingProductIndex !== -1) {
      // Product already exists in the cart, increase count by one
      if (this.cartProducts[existingProductIndex]) {
        this.cartProducts[existingProductIndex].count = (this.cartProducts[existingProductIndex].count || 0) + 1;
      }
    } else {
      // Product does not exist in the cart, add it
      product.count = 1;
      this.cartProducts.push(product);
      this.productCount += 1; // Increase the total product count
    }
  
    this.updateLocalStorage();
  }
  
  incrementProductCount(productId: string): void {
    this.updateProductCount(productId, 1);
  }

  // Method to decrement the count of a product in the cart
  decrementProductCount(productId: string): void {
    this.updateProductCount(productId, -1);
  }

  private updateProductCount(productId: string, countChange: number): void {
    const index = this.cartProducts.findIndex(p => p.id === productId);

    if (index !== -1) {
      // Product exists in the cart
      const newCount = (this.cartProducts[index].count || 0) + countChange;

      if (newCount <= 0) {
        // If the new count is less than or equal to 0, remove the product from the cart
        this.cartProducts.splice(index, 1);
        this.productCount--
      } else {
        // Otherwise, update the count of the product
        this.cartProducts[index].count = newCount;
      }

      // Update the total product count
      this.updateLocalStorage();
    }
  }
  

  getSelectedProduct(): ProductData | null {
    return this.selectedProduct;
  }

  cartCount(count: number): void {
    this.productCount += count;
    localStorage.setItem(this.productCountKey, JSON.stringify(this.productCount));
  }

  // A METHOD TO GET ALL THE SAVED CART PRODUCT

  getCartProducts(): ProductData[] {
    return this.cartProducts;
  }

  removeProductFromCart(product: ProductData): void {
    const index = this.cartProducts.findIndex(p => p.id === product.id);
    if (index !== -1) {
    this.cartProducts.splice(index, 1);
    this.productCount--; // Decrease product count
    this.updateLocalStorage();
    }
  }


  setActiveButton(button: string): void {
    this.activeButton = button;
  }

  getActiveButton(): string {
    return this.activeButton;
  }

}
