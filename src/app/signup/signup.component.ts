import { Component } from '@angular/core';
import { JwtClientService } from '../jwt-client.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  newUser: any = {
    username: '',
    password: '',
    email: '',
    memberId: '', // Assuming this is required, adjust it if not
    dateOfBirth: '',
  };

  signupSuccessMessage: string = ''; // Success message for successful signup
  signupErrorMessage: string = ''; // Error message for failed signup

  constructor(private authService: JwtClientService, private router: Router) { }

  public signUp() {
    // Reset signup success and error messages
    this.signupSuccessMessage = '';
    this.signupErrorMessage = '';

    if (!this.validateFields()) {
      return;
    }

    this.authService.signUp(this.newUser)
      .subscribe(
        (response: any) => {
          // Handle successful signup
          console.log("Signup successful:", response);
          this.signupSuccessMessage = 'Signup successful!'; // Display success message on UI
          // Optionally, navigate to a different page after successful signup
          this.router.navigate(['/login']);
        },
        (error: any) => {
          // Handle signup error
          console.error("Signup failed:", error);

          if (error.status === 400 && error.error && error.error.message) {
            this.signupErrorMessage = error.error.message; // Assign backend error message to display on UI
          } else {
            this.signupErrorMessage = 'Signup failed. Please try again.'; // Default error message
          }
        }
      );
  }

  private validateFields(): boolean {
    if (!this.newUser.username.trim()) {
      this.signupErrorMessage = 'Please provide a username.';
      return false;
    }

    if (!this.newUser.email.trim() || !this.validateEmail(this.newUser.email.trim())) {
      this.signupErrorMessage = 'Please provide a valid email.';
      return false;
    }

    if (!this.newUser.password.trim() || this.newUser.password.trim().length < 8) {
      this.signupErrorMessage = 'Please provide a password with at least 8 characters.';
      return false;
    }

    // Add additional field validations here if needed

    return true;
  }

  private validateEmail(email: string): boolean {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
