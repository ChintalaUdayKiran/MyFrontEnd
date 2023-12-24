import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false; // Simulated authentication status
  authChanged: Subject<boolean> = new Subject<boolean>(); // Subject to emit auth changes

  constructor() { }

  // Method to update login status and emit change event
  updateLoginStatus(status: boolean) {
    this.isLoggedIn = status;
    this.authChanged.next(this.isLoggedIn);
  }

  // Other authentication methods (login, logout, etc.)
}
