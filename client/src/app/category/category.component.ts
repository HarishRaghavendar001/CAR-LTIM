


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
 
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  itemForm: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      baseRate: ['', [Validators.required, Validators.min(0),Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }
 
  ngOnInit(): void {}
 
  onSubmit(): void {
    if (this.itemForm.valid) {
      this.httpService.createCategory(this.itemForm.value).subscribe(
        response => {
          console.log('Category added successfully', response);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error adding category', error);
        }
      );
    }
  }
}



// import { Component, OnInit } from '@angular/core';
// import {
//   FormGroup,
//   FormBuilder,
//   Validators,
//   AbstractControl,
//   ValidationErrors,
//   AsyncValidatorFn
// } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { Observable, of } from 'rxjs';
// import { debounceTime, map } from 'rxjs/operators';
 
// @Component({
//   selector: 'app-category',
//   templateUrl: './category.component.html',
//   styleUrls: ['./category.component.scss']
// })
// export class CategoryComponent implements OnInit {
//   itemForm: FormGroup;
//   categories: any[] = [];
 
//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private authService: AuthService
//   ) {
//     this.itemForm = this.fb.group({
//       name: [
//         '',
//         [Validators.required],
//         // [this.uniqueNameValidator()] // ✅ Custom async validator
//       ],
//       description: ['', Validators.required],
//       baseRate: [
//         '',
//         [
//           Validators.required,
//           Validators.min(0),
//           Validators.pattern(/^\d+(\.\d{1,2})?$/)
//         ]
//       ]
//     });
//   }
 
//   ngOnInit(): void {
//     this.loadCategories();
//   }
 
//   /** ✅ Load categories from localStorage */
//   loadCategories(): void {
//     const stored = localStorage.getItem('categories');
//     this.categories = stored ? JSON.parse(stored) : [];
//   }
 
//   /** ✅ Save categories to localStorage */
//   saveCategories(): void {
//     localStorage.setItem('categories', JSON.stringify(this.categories));
//   }
 

//   // uniqueNameValidator(): AsyncValidatorFn {
//   //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
//   //     if (!control.value) return of(null);
 
//   //     return of(control.value).pipe(
//   //       debounceTime(300),
//   //       map((name) => {
//   //         const stored = localStorage.getItem('categories');
//   //         const categories = stored ? JSON.parse(stored) : [];
//   //         const exists = categories.some(
//   //           (cat: any) => cat.name.toLowerCase() === name.toLowerCase()
//   //         );
//   //         return exists ? { nameTaken: true } : null;
//   //       })
//   //     );
//   //   };
//   // }
 
  
//   onSubmit(): void {
//     if (this.itemForm.valid) {
//       const newCategory = this.itemForm.value;
//       this.categories.push(newCategory);
//       this.saveCategories(); // save to localStorage
 
//       console.log('✅ Category added:', newCategory);
//       this.router.navigate(['/dashboard']);
//     } else {
//       console.log('❌ Invalid form');
//     }
//   }
// }