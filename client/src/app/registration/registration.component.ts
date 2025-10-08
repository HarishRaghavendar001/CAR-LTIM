
 
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  itemForm: FormGroup;
  showSuccessPopup = false;
 
  // Password validation flags
  hasLowercase = false;
  hasUppercase = false;
  hasDigit = false;
  hasSpecialChar = false;
  hasMinLength = false;
 
  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) {
    this.itemForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        ]
      ],
      password: ['', [Validators.required]],
      role: [null, Validators.required]
    });
  }
 
  // Real-time password validation
  validatePassword(): void {
    const password = this.itemForm.get('password')?.value || '';
    this.hasLowercase = /[a-z]/.test(password);
    this.hasUppercase = /[A-Z]/.test(password);
    this.hasDigit = /\d/.test(password);
    this.hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    this.hasMinLength = password.length >= 8;
  }
 
  onSubmit(): void {
    if (this.itemForm.valid) {
      this.httpService.registerUser(this.itemForm.value).subscribe(
        response => {
          console.log('Registration successful', response);
          this.showSuccessPopup = true;
 
          setTimeout(() => {
            this.showSuccessPopup = false;
            this.router.navigate(['/login']);
          }, 3000);
        },
        error => {
          console.error('Registration failed', error);
        }
      );
    }
  }
 
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
 



