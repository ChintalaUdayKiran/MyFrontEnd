import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JwtClientService } from '../jwt-client.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userData: any = {};

  constructor(
    private route: ActivatedRoute,
    private jwtClientService: JwtClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check local storage for token
    const token = localStorage.getItem('token');

    if (!token) {
      // If token doesn't exist, user is not authenticated, redirect to login page
      this.router.navigate(['/login']);
      return;
    }

    // Retrieve the user data passed from the LoginComponent
    const username = localStorage.getItem('username');

    if (!username) {
      // If username doesn't exist in localStorage, handle the scenario accordingly
      console.error('Username not found in localStorage');
      // Redirect or handle the situation as needed (e.g., navigate to login or show an error)
      this.router.navigate(['/login']);
      return;
    }

    this.userData.username = username;

    // Use this.userData as needed, for example, fetching payment data
    this.fetchPaymentData(this.userData.username);
  }

  // Example function to fetch payment data
  fetchPaymentData(username: string): void {
    this.jwtClientService.welcome(username).subscribe(
      (data: any) => {
        console.log('Payment data:', data);
      },
      (error: any) => {
        console.error('Failed to fetch payment data:', error);
      }
    );
  }
}
