import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  itemForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }
 
  onSubmit(): void {
    if (this.itemForm.valid) {
      this.authService.registerUser(this.itemForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful!';
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = 'Registration failed';
          console.error('Registration error:', error);
        }
      });
    }
  }
}
