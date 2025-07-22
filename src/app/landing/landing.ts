import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [CommonModule,RouterLink,MatButton],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {
  constructor(private router: Router) {}

  getStarted() {
    this.router.navigate(['/signup']);
  }
}
