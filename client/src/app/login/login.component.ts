import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  itemForm: FormGroup;
  errorMessage: string = '';
 
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
 
  onSubmit(): void {
    if (this.itemForm.valid) {
      this.authService.login(this.itemForm.value).subscribe({
        next: (response) => {
        this.router.navigate(['/dashboard']); // Navigate to dashboard or home
        },
        error: (error) => {
          this.errorMessage = 'Invalid username or password';
          console.error('Login error:', error);
        }
      });
    }
  }
}
 
