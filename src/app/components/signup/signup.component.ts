import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm!: FormGroup;
  showPassword: boolean = false;

constructor(private formBuilder: FormBuilder) { }

ngOnInit(): void {
this.signUpForm = this.formBuilder.group({
email: ['', [Validators.required, Validators.email]],
password: ['', [Validators.required, Validators.minLength(8)]]
});

}

formAction() {
  if (this.signUpForm.valid) {
    // Form is valid, proceed with form submission
    const formData = this.signUpForm.value;
    alert('Form submitted: ' + JSON.stringify(formData)); // Display form data in alert

    // You can perform further actions like sending the form data to a server
  } else {
    // Form is invalid, display error messages or take other actions
    alert('Form is invalid');
  }
}

togglePassword(): void {
  this.showPassword = !this.showPassword;
}


}
