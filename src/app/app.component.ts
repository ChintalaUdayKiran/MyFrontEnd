import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-spring';
  username: string | null = null;

  constructor(private router: Router) {
    // Check for username in local storage during initialization
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }

  logout() {
    // Clear the username from local storage and reset the username property
    localStorage.removeItem('username');
    this.username = null;
    this.router.navigate(['/login']);
  }
}
