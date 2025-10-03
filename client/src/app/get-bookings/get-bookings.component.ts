import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
 
@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.scss']
})
export class GetBookingsComponent implements OnInit {
  itemForm: FormGroup;
  bookings: any[] = [];
 
  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {
    this.itemForm = this.fb.group({
      amount: ['', Validators.required],
      paymentDate: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      paymentStatus: ['', Validators.required]
    });
  }
 
  ngOnInit(): void {
    this.loadBookings();
  }
 
  loadBookings(): void {
    this.httpService.getBookingByAgent().subscribe((data: any) => {
      this.bookings = data;
    });
  }
 
  submitPayment(bookingId: number): void {
    if (this.itemForm.valid) {
      const formData = {
        ...this.itemForm.value,
        paymentDate: this.datePipe.transform(this.itemForm.value.paymentDate, 'yyyy-MM-dd')
      };
 
      this.httpService.bookingPayment(formData, bookingId).subscribe(response => {
        console.log('Payment processed:', response);
      });
    }
  }
 
  updateStatus(bookingId: number): void {
    this.httpService.updateBookingStatus(bookingId).subscribe(response => {
      console.log('Booking status updated:', response);
    });
  }
}
 
