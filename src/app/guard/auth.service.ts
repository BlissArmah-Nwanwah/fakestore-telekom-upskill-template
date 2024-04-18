import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from './guardtype';

export interface AuthResponseData {
  user: { email: string; firstName: string; role: string };
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  signUp(name: string, email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://quiz-4dtk.onrender.com/api/v1/user/signup',
        {
          name,
          email,
          password,
        }
      )
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.user.email,
            resData.user.firstName,
            resData.token,
            resData.user.role
          );
        }),
        catchError((error) => {
          console.error('Error in signUp:', error);
          throw error;
        })
      );
  }

  logIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://quiz-4dtk.onrender.com/api/v1/user/login',
        {
          email,
          password,
        }
      )
      .pipe(
        tap((resData) => {
          if (resData && resData.user) {
            this.handleAuthentication(
              resData.user.email,
              resData.user.firstName,
              resData.token,
              resData.user.role
            );
          }
        }),
        catchError((error) => {
          console.error('Error in login:', error);
          throw error;
        })
      );
  }

  autoLogin() {
    const email = this.cookieService.get('email');
    const firstName = this.cookieService.get('firstName');
    const role = this.cookieService.get('role');
    const token = this.cookieService.get('token');

    if (email && token) {
      const loadedUser = new User(email, firstName, token, role);
      if (loadedUser) {
        this.user.next(loadedUser);
      }
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    this.cookieService.delete('email');
    this.cookieService.delete('token');
    this.cookieService.delete('firstName');
    this.cookieService.delete('role');
  }

  private handleAuthentication(
    email: string,
    firstName: string,
    token: string,
    role: string
  ) {
    const user = new User(email, firstName, token, role);
    this.user.next(user);

    // Set cookies
    this.cookieService.set('email', email);
    this.cookieService.set('token', token);
    this.cookieService.set('firstName', firstName);
    this.cookieService.set('role', role);
  }
}
