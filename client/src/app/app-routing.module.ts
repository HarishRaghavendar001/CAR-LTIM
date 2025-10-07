import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


import { AppComponent } from './app.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';

import { CategoryComponent } from './category/category.component';
import { AddCarComponent } from './add-car/add-car.component';
import { CarsComponent } from './cars/cars.component';
import { GetBookingsComponent } from './get-bookings/get-bookings.component';
import { BookingReportComponent } from './booking-report/booking-report.component';
import { PaymentReportComponent } from './payment-report/payment-report.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';



const routes: Routes = [
  {path:'update-profile',component:UpdateProfileComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'dashboard', component: DashbaordComponent },


  { path: 'get-bookings', component: GetBookingsComponent }, 
  { path: 'payment-report', component: PaymentReportComponent }, 
  { path: 'booking-report', component: BookingReportComponent }, 
  { path: 'cars', component: CarsComponent }, 
  { path: 'category', component: CategoryComponent }, 
  { path: 'add-car', component: AddCarComponent }, 
 
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

