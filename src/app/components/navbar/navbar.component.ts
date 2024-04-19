import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../guard/auth.service';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterModule, CommonModule, NgOptimizedImage,MatButtonModule],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  isAuthenticated = false;
  userName!: string;
  showNav: boolean = false;
  selectedProductCount: number = 0;
  dropdownVisible: boolean = false;
  isHovered: boolean = false;
  isAuthVisible: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.selectedProductCount = this.productService.productCount;
  }

  ngOnInit(): void {
    this.getProductCount();
    this.userSub = this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log(this.isAuthenticated);
    });
  }

  routeToCart() {
    this.selectedProductCount = this.productService.productCount;
    if (this.selectedProductCount >= 1) {
      this.router.navigate(['/cart']);
    } else {
      this.router.navigate(['/empty-cart']);
    }
  }

  getProductCount(): number {
    return this.productService.productCount;
  }

 
  routeToHome() {
    this.router.navigate(['']);
  }

  logout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
