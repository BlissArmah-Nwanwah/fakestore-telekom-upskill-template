import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../guard/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterModule, CommonModule, NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarComponent implements OnInit, OnDestroy {
  logo: string = '../../../../../assets/Logo.png';
  heart: string = '../../../../../assets/icons/heart.png';
  user: string = '../../../../../assets/icons/user.png';
  cart: string = '../../../../../assets/icons/cart.png';

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
    console.log(this.isAuthenticated);
  }

  ngOnInit(): void {
    this.getProductCount();
    this.userSub = this.authService.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.userName = user?.firstName ?? '';
    });
    console.log(this.isAuthenticated);

  }

  routeToCart() {
    this.selectedProductCount = this.productService.productCount;
    if (this.selectedProductCount >= 1) {
      this.router.navigate(['/cart']);
    } else {
      null;
    }
  }

  getProductCount(): number {
    return this.productService.productCount;
  }

  toggleNav() {
    this.showNav = !this.showNav;
  }
  routeToHome() {
    this.router.navigate(['']);
  }

  hidNav() {
    this.showNav = false;
  }

  showDropdown(): void {
    this.dropdownVisible = true;
  }

  hideDropdown(): void {
    this.dropdownVisible = false;
  }

  hovered() {
    this.isHovered = true;
  }

  notHovered() {
    this.isHovered = false;
  }

  showAuth() {
    this.isAuthVisible = true;
  }
  hideAuth() {
    this.isAuthVisible = false;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
