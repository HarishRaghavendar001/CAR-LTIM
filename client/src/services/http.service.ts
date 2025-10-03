import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
 
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient, private authService: AuthService) {}
 
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
 
  getAllCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/administrator/car-categories`, {
      headers: this.getHeaders()
    });
  }
 
  getBookingByAgent(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/agent/bookings`, {
      headers: this.getHeaders()
    });
  }
 
  paymentReport(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/administrator/reports/payments`, {
      headers: this.getHeaders()
    });
  }
 
  getBookingReport(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/administrator/reports/bookings`, {
      headers: this.getHeaders()
    });
  }
 
  getCars(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/api/customers/cars/available`, {
      headers: this.getHeaders()
    });
  }
 
  bookACar(details: any, userId: number, carId: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/customers/booking?userId=${userId}&carId=${carId}`, details, {
      headers: this.getHeaders()
    });
  }
 
  bookingPayment(details: any, bookingId: number):Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/agent/payment/${bookingId}`, details, {
      headers: this.getHeaders()
    });
  }
 
  updateBookingStatus(bookingId: number):Observable<any>{
    return this.http.put(`${environment.apiUrl}/api/agent/bookings/${bookingId}/status?status=booked`, {}, {
      headers: this.getHeaders()
    });
  }
 
  updateCar(details: any, updateId: number): Observable<any>{
    return this.http.put(`${environment.apiUrl}/api/agent/car/${updateId}`, details, {
      headers: this.getHeaders()
    });
  }
 
  createCar(details: any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/agent/car`, details, {
      headers: this.getHeaders()
    });
  }
 
  createCategory(details: any):Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/administrator/car-categories`, details, {
      headers: this.getHeaders()
    });
  }
 
  updateCategory(details: any, updateId: number): Observable<any>{
    return this.http.put(`${environment.apiUrl}/api/administrator/car-categories/${updateId}`, details, {
      headers: this.getHeaders()
    });
  }
 
  Login(details: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${environment.apiUrl}/api/user/login`, details, { headers });
  }
 
  registerUser(details: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${environment.apiUrl}/api/user/register`, details, { headers });
  }
 
  getToken(): string {
    // This should ideally fetch the token from localStorage or a secure store
    return localStorage.getItem('authToken') || '';
  }
}
 
 
 
 
 
 
