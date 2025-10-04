


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

export interface Category{
  id: number;
}

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {
  itemForm: FormGroup;
  carCategories: any[] = [];
  cars: any[] = [];
  isEditMode: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  showMessage: boolean = false;
  responseMessage: string = '';
  selectedCarId: number = 0;

  constructor(private formBuilder: FormBuilder, private httpService: HttpService) {
    this.itemForm = this.formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      manufactureYear: ['', [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
      status: ['', Validators.required],
      rentalRatePerDay: [0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      registrationNumber: ['', [Validators.required, Validators.pattern(/^\d{2}BH\d{4}[A-Z]{2}$|^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/)]],
      category: [null, Validators.required]
    });
  }
  

  ngOnInit(): void {
    this.getCarCategories();
    this.getCars();
  }

  getCarCategories() {
    this.httpService.getAllCategories().subscribe(
      (data: any) => {
        this.carCategories = data;
      },
      error => {
        this.showError = true;
        this.errorMessage = "Error fetching car categories.";
      }
    );
  }

  getCars() {
    this.httpService.getAllCars().subscribe(
      (data: any) => {
        this.cars = data;
      },
      error => {
        this.showError = true;
        this.errorMessage = "Error fetching cars.";
      }
    );
  }

  onSubmit() {
    if (this.itemForm.valid) {
      if (this.isEditMode && this.selectedCarId !== null) {
        this.updateCar();
      } else {
        this.addCar();
      }
    } else {
      this.showError = true;
      this.errorMessage = "Form values are invalid";
    }
  }

  addCar() {
    let category : Category;
    category = {
      id: this.itemForm.get('category')?.value
    }  
    console.log(category.id);
    this.itemForm.get('category')?.setValue(category);
    this.httpService.createCar(this.itemForm.value).subscribe({
      next: () => {
        console.log(this.itemForm.value)
        this.showMessage = true;
        this.responseMessage = "Car added successfully!";
        this.itemForm.reset();
        this.getCars();
        // this.itemForm.reset();

      },
      error: ()=> {
        this.showError = true;
        this.errorMessage = "Error adding car.";
      }
  });
  }

  editCar(car: any) {
    this.isEditMode = true;
    this.selectedCarId = car.id;
    this.itemForm.patchValue(car);
  }

  updateCar() {
    let category : Category;
    category = {
      id: this.itemForm.get('category')?.value
    }  
    console.log(category.id);
    this.itemForm.get('category')?.setValue(category);
    this.httpService.updateCar(this.itemForm.value, this.selectedCarId).subscribe({
      next:() => {
        this.showMessage = true;
        this.responseMessage = "Car updated successfully!";
        this.itemForm.reset();
        this.isEditMode = false;
        this.selectedCarId = 0;
        this.getCars();
      },
      error:() => {
        this.showError = true;
        this.errorMessage = "Error updating car.";
      }
  });
  }
  
}



















// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpService } from 'src/app/http.service';

// @Component({
//   selector: 'app-add-car',
//   templateUrl: './add-car.component.html',
//   styleUrls: ['./add-car.component.css']
// })
// export class AddCarComponent implements OnInit {
//   itemForm!: FormGroup;
//   carCategories: any[] = [];
//   cars: any[] = [];
//   successMessage = '';
//   errorMessage = '';
//   isEditing = false;
//   editingCarId: number | null = null;

//   constructor(private fb: FormBuilder, private httpService: HttpService) {}

//   ngOnInit(): void {
//     this.itemForm = this.fb.group({
//       make: ['', Validators.required],
//       model: ['', Validators.required],
//       manufactureYear: ['', Validators.required],
//       status: ['available', Validators.required],
//       rentalRatePerDay: ['', Validators.required],
//       registrationNumber: ['', Validators.required],
//       category: ['', Validators.required]
//     });
//     this.getCarCategories();
//     this.getCars();
//   }

//   getCarCategories() {
//     this.httpService.getAllCategories().subscribe({
//       next: (data: any) => this.carCategories = data,
//       error: () => this.errorMessage = 'Error fetching categories'
//     });
//   }

//   getCars() {
//     this.httpService.getAllCars().subscribe({
//       next: (data: any) => this.cars = data,
//       error: () => this.errorMessage = 'Error fetching cars'
//     });
//   }

//   onSubmit() {
//     if (this.itemForm.invalid) return;

//     const category = { id: this.itemForm.get('category')?.value };
//     const carData = { ...this.itemForm.value, category };

//     if (this.isEditing && this.editingCarId) {
//       // ✅ Update Car
//       this.httpService.updateCar(this.editingCarId, carData).subscribe({
//         next: (res: any) => {
//           this.successMessage = res.message || 'Car updated successfully!';
//           this.errorMessage = '';
//           this.isEditing = false;
//           this.editingCarId = null;
//           this.itemForm.reset({ status: 'available' });
//           this.getCars();
//         },
//         error: () => {
//           this.errorMessage = 'Failed to update car';
//           this.successMessage = '';
//         }
//       });
//     } else {
//       // ✅ Add Car
//       this.httpService.addCar(carData).subscribe({
//         next: (res: any) => {
//           this.successMessage = res.message || 'Car added successfully!';
//           this.errorMessage = '';
//           this.itemForm.reset({ status: 'available' });
//           this.getCars();
//         },
//         error: () => {
//           this.errorMessage = 'Failed to add car';
//           this.successMessage = '';
//         }
//       });
//     }
//   }

//   editCar(car: any) {
//     this.isEditing = true;
//     this.editingCarId = car.id;
//     this.itemForm.patchValue({
//       make: car.make,
//       model: car.model,
//       manufactureYear: car.manufactureYear,
//       status: car.status,
//       rentalRatePerDay: car.rentalRatePerDay,
//       registrationNumber: car.registrationNumber,
//       category: car.category?.id
//     });
//   }
// }