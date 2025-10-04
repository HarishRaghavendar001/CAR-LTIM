// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';
// import { DatePipe } from '@angular/common';
 
// @Component({
//   selector: 'app-get-bookings',
//   templateUrl: './get-bookings.component.html',
//   styleUrls: ['./get-bookings.component.scss']
// })
// export class GetBookingsComponent implements OnInit {
//   itemForm: FormGroup;
//   bookings: any[] = [];
 
//   constructor(
//     private fb: FormBuilder,
//     private httpService: HttpService,
//     private authService: AuthService,
//     private datePipe: DatePipe
//   ) {
//     this.itemForm = this.fb.group({
//       amount: ['', Validators.required],
//       paymentDate: ['', Validators.required],
//       paymentMethod: ['', Validators.required],
//       paymentStatus: ['', Validators.required]
//     });
//   }
 
//   ngOnInit(): void {
//     this.loadBookings();
//   }
 
//   loadBookings(): void {
//     this.httpService.getBookingByAgent().subscribe((data: any) => {
//       this.bookings = data;
//     });
//   }
 
//   submitPayment(bookingId: number): void {
//     if (this.itemForm.valid) {
//       const formData = {
//         ...this.itemForm.value,
//         paymentDate: this.datePipe.transform(this.itemForm.value.paymentDate, 'yyyy-MM-dd')
//       };
 
//       this.httpService.bookingPayment(formData, bookingId).subscribe(response => {
//         console.log('Payment processed:', response);
//       });
//     }
//   }
 
//   updateStatus(bookingId: number): void {
//     this.httpService.updateBookingStatus(bookingId).subscribe(response => {
//       console.log('Booking status updated:', response);
//     });
//   }
// }



import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

export interface Booking{
  id: number;
}

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.scss']
})
export class GetBookingsComponent implements OnInit {
  itemForm!: FormGroup;
  bookings: any[] = [];
  showError: boolean = false;
  errorMessage: string = '';
  showSuccessMessage: boolean = false;
  successMessage: string = '';
  selectedBooking: any = null;
  amountToBePaid: number = 0;
  paymentStatus: string = 'pending';

  constructor(private formBuilder: FormBuilder, private httpService: HttpService , private datePipe: DatePipe) {
    this.itemForm = this.formBuilder.group({
      amount: ['', Validators.required],
      paymentDate: [this.getCurrentDate(), Validators.required],
      paymentMethod: ['', Validators.required],
      paymentStatus: ['Pending', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings() {
    this.httpService.getBookingByAgent().subscribe(
      (data: any) => {
        this.bookings = data;
      },
      error => {
        this.showError = true;
        this.errorMessage = "An error occurred while fetching bookings.";
        console.error('Error fetching bookings:', error);
      }
    );
  }

  acceptBooking(bookingId: number, status : string) {
    
    this.httpService.updateBookingStatus(bookingId, status).subscribe(
      (response: any) => {
        this.showSuccessMessage = true;
        this.successMessage = `Booking status set to ${status} successfully!`;
        this.getBookings();
      },
      error => {
        this.showError = true;
        this.errorMessage = "An error occurred while accepting the booking.";
        console.error('Error accepting booking:', error);
      }
    );
  }

  showPaymentForm(booking: any) {
    this.selectedBooking = booking;
    this.amountToBePaid = booking.totalAmount || 0;
    this.paymentStatus = 'Pending';

    this.itemForm.patchValue({
      amount: this.amountToBePaid,
      paymentDate: this.getCurrentDate(),
      paymentMethod: '',
      paymentStatus: 'Pending'
    });
  }

  // createPayment() {
  //   if (this.itemForm.valid && this.selectedBooking) {

  //     // Format the payment date to 'yyyy-MM-dd HH:mm:ss'
  //     const formattedDate = this.datePipe.transform(this.itemForm.get('paymentDate')?.value, 'yyyy-MM-dd HH:mm:ss');

  //     // Update form control with the formatted date
  //     this.itemForm.patchValue({ paymentDate: formattedDate });

  //     let booking : Booking;
  //     booking = {
  //       id: this.selectedBooking.id,
  //     }
      
  //     this.httpService.bookingPayment({...this.itemForm.value , booking : booking }, this.selectedBooking.id).subscribe(
  //       (response: any) => {
  //         this.showSuccessMessage = true;
  //         this.successMessage = "Payment processed successfully!";
  //         this.paymentStatus = 'Completed';
  //         this.acceptBooking(this.selectedBooking.id,'Booked');
  //         this.itemForm.get('paymentStatus')?.setValue('Completed');
  //         this.getBookings();
  //         this.selectedBooking = null;
  //       },
  //       error => {
  //         this.showError = true;
  //         this.errorMessage = "An error occurred while processing the payment.";
  //         console.error('Error processing payment:', error);
  //       }
  //     );
  //   }
  // }

// createPayment() {
//   if (this.itemForm.valid && this.selectedBooking) {
//     const formattedDate = this.datePipe.transform(
//       this.itemForm.get('paymentDate')?.value,
//       'yyyy-MM-dd HH:mm:ss'
//     );

//     const paymentPayload = {
//       amount: this.itemForm.get('amount')?.value,
//       paymentDate: formattedDate,
//       paymentMethod: this.itemForm.get('paymentMethod')?.value,
//       paymentStatus: 'Completed', // set to completed once processed
//       booking: { id: this.selectedBooking.id }
//     };

//     this.httpService.bookingPayment(paymentPayload, this.selectedBooking.id).subscribe(
//       (response: any) => {
//         console.log(paymentPayload);
//         this.showSuccessMessage = true;
//         this.successMessage = 'Payment processed successfully!';
//         this.paymentStatus = 'Completed';
//         this.itemForm.get('paymentStatus')?.setValue('Completed');
//         this.acceptBooking(this.selectedBooking.id, 'Booked');
//         this.getBookings();
//         this.selectedBooking = null;
//       },
//       (error) => {
//         // console.log('hi');
//         this.showError = true;
//         this.errorMessage = 'An error occurred while processing the payment.';
//         // console.error('Error processing payment:', error);
//       }
//     );
//   }
// }

createPayment() {
  if (this.itemForm.valid && this.selectedBooking) {
    const formattedDate = this.datePipe.transform(
      this.itemForm.get('paymentDate')?.value,
      'yyyy-MM-dd HH:mm:ss'
    );

    
const paymentPayload = {
  amount: parseFloat(this.itemForm.get('amount')?.value),
  paymentDate: new Date(this.itemForm.get('paymentDate')?.value).toISOString(),
  paymentMethod: this.itemForm.get('paymentMethod')?.value,
  paymentStatus: 'Completed',
  booking: {
    id: this.selectedBooking?.id
  }
};

    console.log('Sending payment payload:', paymentPayload);

    this.httpService.bookingPayment(paymentPayload, this.selectedBooking.id).subscribe(
      (response: any) => {
        this.showSuccessMessage = true;
        this.successMessage = 'Payment processed successfully!';
        this.paymentStatus = 'Completed';
        this.itemForm.get('paymentStatus')?.setValue('Completed');
        this.acceptBooking(this.selectedBooking.id, 'Booked');
        this.getBookings();
        this.selectedBooking = null;
      },
      (error) => {
        this.showError = true;
        this.errorMessage = 'An error occurred while processing the payment.';
        // console.error('Error processing payment:', error);
      }
    );
  }
}


  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}

 
