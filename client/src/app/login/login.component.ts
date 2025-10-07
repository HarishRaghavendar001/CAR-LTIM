
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';
 
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   itemForm!: FormGroup;
//   errorMessage: string = '';
 
//   constructor(
//     private formBuilder: FormBuilder,
//     private httpService: HttpService,
//     private authService: AuthService,
//     private router: Router
//   ) {}
 
//   ngOnInit(): void {
//     this.itemForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }
 
//   onSubmit(): void {
//     if (this.itemForm.valid) {
//       const { username, password } = this.itemForm.value;
//       this.httpService.Login({ username, password }).subscribe(
//         (response: any) => {
//           this.authService.saveToken(response.token);
//           this.authService.setRole(response.role);
//           this.authService.saveUserId(response.userId);
//           console.log("token saved");
//           this.router.navigate(['/dashboard']);
//         },
//         (error) => {
//           console.log("login failed.")
//           this.errorMessage = 'Invalid username or password';
//         }
//       );
//     }
//   }

//   navigateToHome(){
//     this.router.navigateByUrl('home');
//   }
  

// }



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  itemForm!: FormGroup;
  errorMessage: string = '';
  captchaQuestion: string = '';
  captchaAnswer: number = 0;
  captchaError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      captcha: ['', Validators.required]
    });

    this.generateCaptcha();
  }

  generateCaptcha(): void {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    this.captchaQuestion = `${num1} + ${num2} = ?`;
    this.captchaAnswer = num1 + num2;
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const { username, password, captcha } = this.itemForm.value;

      //  Validate captcha before sending request
      if (parseInt(captcha) !== this.captchaAnswer) {
        this.captchaError = true;
        this.generateCaptcha(); // regenerate for next attempt
        return;
      } else {
        this.captchaError = false;
      }

      this.httpService.Login({ username, password }).subscribe(
        (response: any) => {
          this.authService.saveToken(response.token);
          this.authService.setRole(response.role);
          this.authService.saveUserId(response.userId);
          localStorage.setItem('username',username)
          console.log("token saved");
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log("login failed.")
          this.errorMessage = 'Invalid username or password';
          this.generateCaptcha(); // regenerate after failure
        }
      );
    }
  }

  navigateToHome() {
    this.router.navigateByUrl('home');
  }
}
