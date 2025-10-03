import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
 
@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  itemForm: FormGroup;
  availableCars: any[] = [];
 
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {
    this.itemForm = this.fb.group({
      rentalStartDate: ['', Validators.required],
      rentalEndDate: ['', Validators.required]
    });
  }
 
  ngOnInit(): void {
    this.loadAvailableCars();
  }
 
  loadAvailableCars(): void {
    this.httpService.getCars().subscribe((cars: any[]) => {
      this.availableCars = cars;
    });
  }
 
  bookCar(carId: number): void {
    if (this.itemForm.valid) {
      const userId = 1; // Replace with actual user ID logic
      const bookingDetails = {
        date: this.datePipe.transform(this.itemForm.value.rentalStartDate, 'yyyy-MM-dd'),
        time: this.datePipe.transform(this.itemForm.value.rentalEndDate, 'yyyy-MM-dd')
      };
 
      this.httpService.bookACar(bookingDetails, userId, carId).subscribe(response => {
        console.log('Car booked successfully:', response);
        this.router.navigate(['/bookings']); // Optional navigation
      });
    }
  }
}
 
