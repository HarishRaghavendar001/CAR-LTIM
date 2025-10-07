// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpService } from '../../services/http.service';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { DatePipe } from '@angular/common';
 
// @Component({
//   selector: 'app-cars',
//   templateUrl: './cars.component.html',
//   styleUrls: ['./cars.component.scss']
// })
// export class CarsComponent implements OnInit {
//   itemForm: FormGroup;
//   availableCars: any[] = [];
 
//   constructor(
//     private fb: FormBuilder,
//     private httpService: HttpService,
//     private router: Router,
//     private authService: AuthService,
//     private datePipe: DatePipe
//   ) {
//     this.itemForm = this.fb.group({
//       rentalStartDate: ['', Validators.required],
//       rentalEndDate: ['', Validators.required]
//     });
//   }
 
//   ngOnInit(): void {
//     this.loadAvailableCars();
//   }
 
//   loadAvailableCars(): void {
//     this.httpService.getCars().subscribe((cars: any[]) => {
//       this.availableCars = cars;
//     });
//   }
 
//   bookCar(carId: number): void {
//     if (this.itemForm.valid) {
//       const userId = 1; // Replace with actual user ID logic
//       const bookingDetails = {
//         date: this.datePipe.transform(this.itemForm.value.rentalStartDate, 'yyyy-MM-dd'),
//         time: this.datePipe.transform(this.itemForm.value.rentalEndDate, 'yyyy-MM-dd')
//       };
 
//       this.httpService.bookACar(bookingDetails, userId, carId).subscribe(response => {
//         console.log('Car booked successfully:', response);
//         this.router.navigate(['/bookings']); // Optional navigation
//       });
//     }
//   }
// }
// ----------------------------
// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { HttpService } from '../../services/http.service';
// import { DatePipe } from '@angular/common';

// @Component({
//   selector: 'app-cars',
//   templateUrl: './cars.component.html',
//   styleUrls: ['./cars.component.scss']
// })
// export class CarsComponent implements OnInit {
//   itemForm!: FormGroup;
//   cars: any[] = [];
//   filteredCars: any[] = [];
//   userBookings: any[] = [];
//   userId: number | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private httpService: HttpService,
//     private router: Router,
//     private authService: AuthService,
//     private datePipe: DatePipe
//   ) {}

//   ngOnInit(): void {
//     this.initializeForm();
//     this.userId = this.authService.getUserId();
//     this.loadCars();
//     this.getAllBookings();
//   }

//   private initializeForm(): void {
//     this.itemForm = this.fb.group({
//       rentalStartDate: ["", Validators.required],
//       rentalEndDate: ["", Validators.required]
//     });
//   }

//   private loadCars(): void {
//     this.httpService.getCars().subscribe(
//       (cars) => {
//         this.cars = cars;
//         this.filterCars();
//       },
//       (error) => console.error('Error fetching cars:', error)
//     );
//   }

//   getAllBookings(): void {
//     if (!this.userId) return;

//     this.httpService.getBookingsByUserId(this.userId).subscribe(
//       (bookings) => {
//         this.userBookings = bookings.map((booking: any) => ({
//           ...booking,
//           statusMessage: booking.status === "pending" ? "Pending for acceptance" : "Booked"
//         }));

//         this.filterCars();
//       },
//       (error) => console.error('Error fetching bookings:', error)
//     );
//   }

//   filterCars(): void {
//     const startDate = new Date(this.itemForm.value.rentalStartDate);
//     const endDate = new Date(this.itemForm.value.rentalEndDate);

//     // Filter out available cars
//     let availableCars = this.cars.filter(car => car.status.toLowerCase() === "available");

//     // Combine booked, pending, and available cars
//     this.filteredCars = [
//       ...this.userBookings.filter(b => b.status === "Booked"),
//       ...this.userBookings.filter(b => b.status === "Pending"),
//       ...availableCars
//     ];
//   }
//   bookCar(carId: number): void {
//     if (this.itemForm.valid && this.userId) {
//       const rentalStartDate = new Date(this.itemForm.value.rentalStartDate);
//       const rentalEndDate = new Date(this.itemForm.value.rentalEndDate);

//       const formattedStartDate = this.datePipe.transform(rentalStartDate, 'yyyy-MM-dd HH:mm:ss');
//       const formattedEndDate = this.datePipe.transform(rentalEndDate, 'yyyy-MM-dd HH:mm:ss');

//       if (!formattedStartDate || !formattedEndDate) {
//         console.error('Date formatting failed');
//         return;
//       }

//       const bookingDetails = {
//         rentalStartDate: formattedStartDate,
//         rentalEndDate: formattedEndDate
//       };

//       this.httpService.bookACar(bookingDetails, this.userId, carId).subscribe(
//         () => {
//           console.log('Car booked successfully');
//           this.getAllBookings();
//         },
//         (error) => console.error('Error booking car:', error)
//       );
//     } else {
//       console.warn('Form is invalid');
//     }
//   }
// }

 
 
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';
import { debounceTime } from 'rxjs/operators';
 
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  itemForm!: FormGroup;
 
  cars: any[] = [];
  filteredCars: any[] = [];
  userBookings: any[] = [];
  categories: string[] = [];
 
  userId: number | null = null;
 
  // Material Datepicker config
  minDate = new Date();         // disable past dates
  maxDate?: Date;               // optional: set a max date (e.g., +1 year)
  // maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
 
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}
 
  ngOnInit(): void {
    this.initializeForm();
 
    // live filters (e.g., for search term/category if added)
    this.itemForm.valueChanges.pipe(debounceTime(150)).subscribe(() => {
      this.applyFilters();
    
    });
 
    this.userId = this.authService.getUserId();
    this.loadCars();
    this.getAllBookings();
    this.buildCategoryList();
  }
 
  private initializeForm(): void {
    this.itemForm = this.fb.group(
      {
        rentalStartDate: [null, Validators.required], // Date object
        rentalEndDate:   [null, Validators.required], // Date object
        // (optional if you added search elsewhere)
        searchTerm: [''],
        category: ['all']
      },
      { validators: this.dateRangeValidator }
    );
  }
 
  /** Ensure start <= end */
  private dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('rentalStartDate')?.value as Date | null;
    const end = group.get('rentalEndDate')?.value as Date | null;
    if (start && end && start > end) {
      return { dateRangeInvalid: true };
    }
    return null;
  }
 
  private loadCars(): void {
    this.httpService.getCars().subscribe(
      (cars) => {
        this.cars = cars || [];
        this.buildCategoryList();
        this.applyFilters();
      },
      (error) => console.error('Error fetching cars:', error)
    );
  }
 
  getAllBookings(): void {
    if (!this.userId) return;
 
    this.httpService.getBookingsByUserId(this.userId).subscribe(
      (bookings) => {
        this.userBookings = (bookings || []).map((booking: any) => ({
          ...booking,
          statusMessage: booking.status === 'pending' ? 'Pending for acceptance' : 'Booked'
        }));
        this.buildCategoryList();
        this.applyFilters();
      },
      (error) => console.error('Error fetching bookings:', error)
    );
  }
 
  private applyFilters(): void {
    const { searchTerm, category } = this.itemForm.value;
 
    const availableCars = (this.cars || []).filter(
      (car: any) => (car?.status ?? '').toLowerCase() === 'available'
    );
 
    let combined: any[] = [
      ...this.userBookings.filter((b: any) => (b?.status ?? '').toLowerCase() === 'booked'),
      ...this.userBookings.filter((b: any) => (b?.status ?? '').toLowerCase() === 'pending'),
      ...availableCars
    ];
 
    const term = (searchTerm ?? '').trim().toLowerCase();
    if (term) {
      combined = combined.filter(item => {
        const c = this.unwrap(item);
        const haystack = [
          c?.make ?? '',
          c?.model ?? '',
          this.getCategoryName(c)
        ].join(' ').toLowerCase();
        return haystack.includes(term);
      });
    }
 
    if (category && category !== 'all') {
      const catLower = String(category).toLowerCase();
      combined = combined.filter(item => {
        const c = this.unwrap(item);
        return this.getCategoryName(c).toLowerCase() === catLower;
      });
    }
 
    this.filteredCars = combined;
  }
 
  filterCars(): void {
    this.applyFilters();
  }
 
  bookCar(carId: number): void {
    if (this.itemForm.valid && this.userId) {
      const rentalStartDate: Date = this.itemForm.value.rentalStartDate;
      const rentalEndDate: Date = this.itemForm.value.rentalEndDate;
 
      const formattedStartDate = this.datePipe.transform(rentalStartDate, 'yyyy-MM-dd HH:mm:ss');
      const formattedEndDate   = this.datePipe.transform(rentalEndDate, 'yyyy-MM-dd HH:mm:ss');
 
      if (!formattedStartDate || !formattedEndDate) {
        console.error('Date formatting failed');
        return;
      }
 
      const bookingDetails = {
        rentalStartDate: formattedStartDate,
        rentalEndDate: formattedEndDate
      };
 
      this.httpService.bookACar(bookingDetails, this.userId, carId).subscribe(
        () => {
          console.log('Car booked successfully');
          this.getAllBookings();
        },
        (error) => console.error('Error booking car:', error)
      );
    } else {
      console.warn('Form is invalid');
    }
  }
 
  // ===== Helpers =====
  private unwrap(item: any): any {
    return item?.car ? item.car : item;
  }
 
  private getCategoryName(c: any): string {
    if (!c) return '';
    const cat = c.category;
    if (!cat) return '';
    if (typeof cat === 'string') return cat;
    if (typeof cat?.name === 'string') return cat.name;
    if (typeof cat?.categoryName === 'string') return cat.categoryName;
    return '';
  }
 
  private buildCategoryList(): void {
    const set = new Set<string>();
    const source = [...(this.cars || []), ...(this.userBookings || [])];
    for (const item of source) {
      const c = this.unwrap(item);
      const name = this.getCategoryName(c);
      if (name) set.add(name);
    }
    this.categories = Array.from(set).sort((a, b) => a.localeCompare(b));
  }
 
  clearSearch(): void {
    this.itemForm.patchValue({ searchTerm: '', category: 'all' });
  }
 
  trackByCarId = (_: number, item: any) => (item?.car ? item.car?.id : item?.id);
}
 