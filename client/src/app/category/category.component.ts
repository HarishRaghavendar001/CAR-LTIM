


 
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
 
  // Array of 10 predefined category name suggestions
  categorySuggestions: string[] = [
    'SUV',
    'Sedan',
    'Hatchback',
    'Convertible',
    'Coupe',
    'Pickup Truck',
    'Electric Vehicle',
    'Luxury Car',
    'Sports Car',
    'Crossover'
  ];
 
  filteredSuggestions: string[] = [];
  showSuggestions: boolean = false;
 
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private httpService: HttpService
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      baseRate: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }
 
  ngOnInit(): void {}
 
  // Filter category suggestions as user types
  onNameInput(): void {
    const input = this.itemForm.get('name')?.value.toLowerCase();
    if (input) {
      this.filteredSuggestions = this.categorySuggestions.filter(cat =>
        cat.toLowerCase().includes(input)
      );
      this.showSuggestions = this.filteredSuggestions.length > 0;
    } else {
      this.showSuggestions = false;
    }
  }
 
  // Set selected suggestion into input field
  selectSuggestion(suggestion: string): void {
    this.itemForm.get('name')?.setValue(suggestion);
    this.showSuggestions = false;
  }
 
  onSubmit(): void {
    if (this.itemForm.valid) {
      this.httpService.createCategory(this.itemForm.value).subscribe(
        response => {
          alert('Category added successfully');
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
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { HttpService } from '../../services/http.service';
 
// @Component({
//   selector: 'app-category',
//   templateUrl: './category.component.html',
//   styleUrls: ['./category.component.scss']
// })
// export class CategoryComponent implements OnInit {
//   itemForm: FormGroup;
 
//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private authService: AuthService,
//     private httpService: HttpService
//   ) {
//     this.itemForm = this.fb.group({
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       baseRate: ['', [Validators.required, Validators.min(1),Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
//     });
//   }
 
//   ngOnInit(): void {}
 
//   onSubmit(): void {
//     if (this.itemForm.valid) {
//       this.httpService.createCategory(this.itemForm.value).subscribe(
//         response => {
//           alert('Category added successfully');
//           this.router.navigate(['/dashboard']);
//         },
//         error => {
//           console.error('Error adding category', error);
//         }
//       );
//     }
//   }
// }


