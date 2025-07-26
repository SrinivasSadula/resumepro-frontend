import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private api = 'https://resumepro-backend-production.up.railway.app/' + 'api/auth'; // change if deployed
  //private baseUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'resumepro_token';
  private premiumStatus = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private router: Router) { }

  login(data: any) {
    return this.http.post<{ token: string }>(`${this.api}/login`, data);
  }

  signup(data: any) {
    return this.http.post<{ token: string }>(`${this.api}/signup`, data);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.premiumStatus.next(false);
    this.router.navigate(['/login']);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    const decoded = JSON.parse(atob(token.split('.')[1]));
    this.premiumStatus.next(decoded.isPremium);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

   setPremium(status:boolean) {
    this.premiumStatus.next(status);
    }
  isPremiumUser(): boolean {
    const token = this.getToken();
    if (!token) return false;
    console.log('Checking premium status from token:', token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded payload:', payload);
    return payload.isPremium;
  }


}
