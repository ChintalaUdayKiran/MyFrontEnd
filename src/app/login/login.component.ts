import { Component } from '@angular/core';
import { JwtClientService } from '../jwt-client.service';
import { AuthService } from '../auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginErrorMessage: string = '';
  credentials: any = {
    username: '',
    password: '',
  };

  constructor(
    private authService: JwtClientService,
    private service: AuthService,
    private router: Router
  ) {}

  public login() {
    console.log("LOGIN STARTED");
    if (!this.credentials.username || !this.credentials.password) {
      // Check if username or password is empty
      this.loginErrorMessage = 'Username and password are required.';
      return; // Stop the login process if fields are empty
    }

    // If fields are not empty, proceed with login
    this.authService.login(this.credentials)
      .subscribe(
        (response: any) => {
          let responseJson = JSON.parse(response); // Parse the JSON string

          let accessToken = responseJson.accessToken;

          console.log("Access Token:", accessToken);

          // Store user data in local storage upon successful login
          localStorage.setItem('token', accessToken); // Assuming your token is returned in the response
          localStorage.setItem('username', this.credentials.username);

          this.service.isLoggedIn = true;

          // Redirect to 'welcome' route upon successful login
          const user = { username: this.credentials.username };
          const navigationExtras: NavigationExtras = {
            state: { user }
          };
          this.router.navigate(['/welcome'], navigationExtras).then(() => {
            // Reload the page after a slight delay (e.g., 100 milliseconds)
            setTimeout(() => {
              window.location.reload();
            }, 100);
          });
        },
        (error: any) => {
          console.error("Login failed:", error);
          this.service.isLoggedIn = false;
          if (error.status === 401) {
            // If invalid username/password, navigate to sign-up route
            this.router.navigate(['/signup']);
          } else {
            // For other errors, display an error message
            this.loginErrorMessage = 'Login failed. Please try again.';
          }
        }
      );
  }
}
