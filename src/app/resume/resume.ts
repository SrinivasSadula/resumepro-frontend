import { Component } from '@angular/core';
import { ResumeService } from './resume-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resume',
  imports: [ CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatSpinner,
    ReactiveFormsModule],
  templateUrl: './resume.html',
  styleUrl: './resume.css'
})
export class Resume {
  name = '';
  email = '';
  summary = '';
  skills = '';
  success = '';
  error = '';
  loading = false;

  constructor(private resumeService: ResumeService,private snackBar: MatSnackBar) {}

  save() {
    const resume = {
      name: this.name,
      email: this.email,
      summary: this.summary,
      skills: this.skills.split(',').map(s => s.trim())
    };
    this.loading = true;
    this.resumeService.saveResume(resume).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Resume saved!', 'Close', { duration: 3000,panelClass: ['snackbar-success'] });
        this.success = 'Resume saved!';
        this.error = '';
      },
      error: err => {
        this.loading = false;
        this.error = err.error.message || 'Failed to save resume';
        this.success = '';
      }
    });
  }
}
