import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})

export class RazorpayService {
  //private api = 'https://resumepro-backend-production.up.railway.app/'+'api/payment';
  private api = 'http://localhost:5000/'+'api/payment';

  constructor(private http: HttpClient, private auth: Auth) {}

  createOrder(data: any) {
    return this.http.post(`${this.api}/create-order`,data, {
      headers: {
        Authorization: `${this.auth.getToken()}`
      }
    });
  }

  verifyPayment(data: any) {
    return this.http.post(`${this.api}/verify`, data,{
      headers: {
        Authorization: `${this.auth.getToken()}`
      }
    });
  }
}

