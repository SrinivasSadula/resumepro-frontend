import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../auth';
import { Router, RouterLink } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-signup',
  imports: [ CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatSpinner,
    MatIcon,
    MatCard],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})

export class Signup implements OnInit {
  signupForm!: FormGroup;
  loading = false;
  hidePassword = true;
  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}  

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
   signup() {
    if (this.signupForm.valid) {
      this.loading = true;
      this.authService.signup(this.signupForm.value).subscribe({
        next: (res:any) => {
          this.authService.saveToken(res.token);
          this.snackBar.open('Signup successful', 'Close', { duration: 3000 });
          this.router.navigate(['/resume']);
          this.loading = false;
        },
        error: (err) => {
          this.snackBar.open(err.error.message || 'Signup failed', 'Close', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }
}