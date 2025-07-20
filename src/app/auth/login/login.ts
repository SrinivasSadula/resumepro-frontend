import { Component, OnInit } from '@angular/core';
import { Auth } from '../auth';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [ CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCard,
    RouterLink,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{
  loginForm!: FormGroup;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // onLogin() {
  //   this.auth.login(this.email, this.password).subscribe({
  //     next: res => {
  //       this.auth.saveToken(res.token);
  //       this.router.navigate(['/dashboard']);
  //     },
  //     error: err => {
  //       this.error = err.error.message || 'Login failed';
  //     }
  //   });
  // }
  login() {
    if (this.loginForm.valid) {
       this.loading = true;
      this.auth.login(this.loginForm.value).subscribe({
        next: (res:any) => {
          this.auth.saveToken(res.token);
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/resume']);
          this.loading = false;
          },
        error: err => {
           this.snackBar.open(err.error.message || 'Login failed', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }
}
