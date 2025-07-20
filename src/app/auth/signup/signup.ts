import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../auth';
import { Router, RouterLink } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  imports: [ CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatCard],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})

export class Signup implements OnInit {
  signupForm!: FormGroup;
  loading = false;
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
      this.authService.signup(this.signupForm.value).subscribe({
        next: (res:any) => {
          this.authService.saveToken(res.token);
          this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
          this.router.navigate(['/resume']);
          this.loading = false;
        },
        error: err => alert(err.error.message)
      });
    }
  }
}