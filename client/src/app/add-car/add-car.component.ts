









import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
 declare var bootstrap:any;
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
  selectedCar : any = null;
 
  constructor(private formBuilder: FormBuilder, private httpService: HttpService) {
    this.itemForm = this.formBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      manufactureYear: ['', [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
      status: ['', Validators.required],
      rentalRatePerDay: [1, [Validators.required,,Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      // registrationNumber: ['', [Validators.required, Validators.pattern(/^\d{2}BH\d{4}[A-Z]{2}$|^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/)]],
      registrationNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/)]],
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
 
        this.showSuccessMessage("Car added successfully!");
        this.itemForm.reset();
 
        this.getCars();
        // this.itemForm.reset();
 
      },
      error: ()=> {
       this.showErrorMessage("Error adding car.")
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
    // this.itemForm.get
    console.log(category.id);
    this.itemForm.get('category')?.setValue(category);
    this.httpService.updateCar(this.itemForm.value, this.selectedCarId).subscribe({
      next:(savecar:any) => {
 
        this.showSuccessMessage("Car updated successfully!");
        this.itemForm.reset();
        this.isEditMode=false;
        this.selectedCarId=0;
        this.getCars();
        this.viewCarDetails(savecar);
     
      },
      error:() => {
        this.showErrorMessage("Error updating car.")
      }
  });
  }
  showSuccessMessage(mssg: string) {
    this.showMessage=true;
    alert(this.responseMessage=mssg)
    setTimeout(() => {
      this.showMessage=false
    }, 3000);
  }
  showErrorMessage(mssg: string) {
   this.showError=true;
   this.errorMessage=mssg
   setTimeout(()=>this.showError=false,3000)
  }
 
 
  // openDetails(car: any) {
  //   this.selectedCar = car;
  //   // Show bootstrap modal
  //   const modalEl : any =document.getElementById('carDetailModal');
  //   const modal = new(window as any ).bootstrap.Modal(modalEl);
  //   modal.show();
  // }
 

  
  viewCarDetails(car: any) {
    this.selectedCar = car;
  
    const modalElement = document.getElementById('carDetailModal');
    const modal =new bootstrap.Modal(modalElement!);
    modal.show();
  }
  
  getCategoryName(categoryId: any): string {
    const cat = this.carCategories.find((c: any) => c.id === categoryId);
    return cat ? cat.name : '';
  }
deleteCar(carId: number) {
    if (confirm("Are you sure you want to delete this car?")) {
      this.httpService.deleteCar(carId).subscribe({
        next: () => {
          this.showSuccessMessage("Car deleted successfully!");
          this.getCars(); // Refresh the list
        },
        error: () => {
          this.showErrorMessage("Error deleting car.");
        }
      });
    }
  }



 
}


















// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { HttpService } from '../../services/http.service';

// export interface Category{
//   id: number;
// }

// @Component({
//   selector: 'app-add-car',
//   templateUrl: './add-car.component.html',
//   styleUrls: ['./add-car.component.scss']
// })
// export class AddCarComponent implements OnInit {
//   itemForm: FormGroup;
//   carCategories: any[] = [];
//   cars: any[] = [];
//   isEditMode: boolean = false;
//   showError: boolean = false;
//   errorMessage: string = '';
//   showMessage: boolean = false;
//   responseMessage: string = '';
//   selectedCarId: number = 0;

//   constructor(private formBuilder: FormBuilder, private httpService: HttpService) {
//     this.itemForm = this.formBuilder.group({
//       make: ['', Validators.required],
//       model: ['', Validators.required],
//       manufactureYear: ['', [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)]],
//       status: ['', Validators.required],
//       rentalRatePerDay: [0, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
//       registrationNumber: ['', [Validators.required, Validators.pattern(/^\d{2}BH\d{4}[A-Z]{2}$|^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/)]],
//       category: [null, Validators.required]
//     });
//   }
  

//   ngOnInit(): void {
//     this.getCarCategories();
//     this.getCars();
//   }

//   getCarCategories() {
//     this.httpService.getAllCategories().subscribe(
//       (data: any) => {
//         this.carCategories = data;
//       },
//       error => {
//         this.showError = true;
//         this.errorMessage = "Error fetching car categories.";
//       }
//     );
//   }

//   getCars() {
//     this.httpService.getAllCars().subscribe(
//       (data: any) => {
//         this.cars = data;
//       },
//       error => {
//         this.showError = true;
//         this.errorMessage = "Error fetching cars.";
//       }
//     );
//   }

//   onSubmit() {
//     if (this.itemForm.valid) {
//       if (this.isEditMode && this.selectedCarId !== null) {
//         this.updateCar();
//       } else {
//         this.addCar();
//       }
//     } else {
//       this.showError = true;
//       this.errorMessage = "Form values are invalid";
//     }
//   }

//   addCar() {
//     let category : Category;
//     category = {
//       id: this.itemForm.get('category')?.value
//     }  
//     console.log(category.id);
//     this.itemForm.get('category')?.setValue(category);
//     this.httpService.createCar(this.itemForm.value).subscribe({
//       next: () => {
//         console.log(this.itemForm.value)
//         this.showMessage = true;
//         this.responseMessage = "Car added successfully!";
//         this.itemForm.reset();
//         this.getCars();
//         // this.itemForm.reset();

//       },
//       error: ()=> {
//         this.showError = true;
//         this.errorMessage = "Error adding car.";
//       }
//   });
//   }

//   editCar(car: any) {
//     this.isEditMode = true;
//     this.selectedCarId = car.id;
//     this.itemForm.patchValue(car);
//   }

//   updateCar() {
//     let category : Category;
//     category = {
//       id: this.itemForm.get('category')?.value
//     }  
//     console.log(category.id);
//     this.itemForm.get('category')?.setValue(category);
//     this.httpService.updateCar(this.itemForm.value, this.selectedCarId).subscribe({
//       next:() => {
//         this.showMessage = true;
//         this.responseMessage = "Car updated successfully!";
//         this.itemForm.reset();
//         this.isEditMode = false;
//         this.selectedCarId = 0;
//         this.getCars();
//       },
//       error:() => {
//         this.showError = true;
//         this.errorMessage = "Error updating car.";
//       }
//   });
//   }
  
// }

















