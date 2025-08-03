import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private api = 'https://resumepro-backend-production.up.railway.app/'+'api/resume';
  //private api = 'http://localhost:5000/'+'api/resume';

  constructor(private http: HttpClient, private auth: Auth) {}

  saveResume(resume: any) {
    return this.http.post(`${this.api}/save`, resume, {
      headers: {
        Authorization: `${this.auth.getToken()}`
      }
    });
  }

  getAllResumes() {
    return this.http.get(`${this.api}/all`, {
      headers: {
        Authorization: `${this.auth.getToken()}`
      }
    });
  }
}
