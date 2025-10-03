import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private isLoggedIn: boolean = false;
 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
 
  private loginUrl = `${environment.apiUrl}/user/login`;
  private registerUrl = `${environment.apiUrl}/user/register`;
 
  constructor(private http: HttpClient) {}
 
  /** Login API call >*/
  login(user: Partial<any>): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.loginUrl, user, this.httpOptions);
  }
 
  /** Register API call */
  registerUser(user: Partial<any>): Observable<{ success: boolean }> {
    return this.http.post<{ success: boolean }>(this.registerUrl, user, this.httpOptions);
  }
 
  /** Save token to localStorage */
  saveToken(token: string): void {
    this.token = token;
    this.isLoggedIn = true;
    localStorage.setItem('token', token);
  }
 
  /** Get token from localStorage */
  getToken(): string | null {
    this.token = localStorage.getItem('token');
    return this.token;
  }
 
  /** Save user role */
  setRole(role: string): void {
    localStorage.setItem('role', role);
  }
 
  /** Get user role */
  get getRole(): string | null {
    return localStorage.getItem('role');
  }
 
  /** Save user ID */
  saveUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }
 
  /** Get login status */
  get getLoginStatus(): boolean {
    return !!localStorage.getItem('token');
  }
 
  /** Logout and clear session */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    this.token = null;
    this.isLoggedIn = false;
  }
}
 
