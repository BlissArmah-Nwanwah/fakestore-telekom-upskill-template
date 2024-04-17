import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthResponseData, AuthService } from '../../guard/auth.service';


@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [CommonModule, RouterModule, ReactiveFormsModule],

})

export class LoginComponent implements OnInit {
  signupForm!: FormGroup 
  createAccount = false;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  onToggleCreateAccount() {
    this.createAccount = !this.createAccount;
    
    // Set the 'name' field validator based on the 'createAccount' flag
    if (this.createAccount) {
      this.signupForm.get('name')?.setValidators([Validators.required]);
    } else {
      this.signupForm.get('name')?.clearValidators();
    }
    // Update the 'name' field validation
    this.signupForm.get('name')?.updateValueAndValidity();
  }

  onSubmit() {
    const name = this.signupForm.value.name;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.createAccount) {
      authObs = this.authService.signUp(name, email, password);
    } else {
      authObs = this.authService.logIn(email, password);
    }

    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['']);
        this.signupForm.reset();
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.signupForm.reset();

      }
    );

}
}