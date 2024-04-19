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
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null, Validators.required),
    });
  }



  onSubmit() {
    const username = this.signupForm.value.username;
    const password = this.signupForm.value.password;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;


      authObs = this.authService.logIn(username, password);
    

    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/']);
        this.signupForm.reset();
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.signupForm.reset();
        this.errorMessage = error.message;
      }
    );

}
}