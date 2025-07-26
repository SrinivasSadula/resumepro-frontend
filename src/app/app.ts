import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Auth } from './auth/auth';
import { version } from '../../package.json'; // Adjust the path as necessary to import version from package.json

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'resumepro-frontend';
  public isLoggedIn = false;
  version = version;
constructor(
    private authService: Auth
  ) {
    console.log(this.version);
    console.log('App component initialized',this.authService.isLoggedIn());
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
    // Optionally, add logic to clear user session and redirect
  }
}
