import { Component } from '@angular/core';
import { ResumeService } from './resume-service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-resume',
  imports: [ CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
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

  constructor(private resumeService: ResumeService) {}

  save() {
    const resume = {
      name: this.name,
      email: this.email,
      summary: this.summary,
      skills: this.skills.split(',').map(s => s.trim())
    };

    this.resumeService.saveResume(resume).subscribe({
      next: () => {
        this.success = 'Resume saved!';
        this.error = '';
      },
      error: err => {
        this.error = err.error.message || 'Failed to save resume';
        this.success = '';
      }
    });
  }
}
