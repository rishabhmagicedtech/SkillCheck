import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [FormsModule, RouterLink],
  standalone: true,
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  // Form fields bound to the template
  name = '';
  email = '';
  password = '';
  role = '';

  constructor(public router: Router, private authService: AuthService) {}

  // Function to handle signup form submission
  onSignup() {
    // Preparing user data object from form inputs
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
    };

    try {
      // Calling signup API via AuthService
      this.authService.signup(userData).subscribe(
        (res) => {
          if (res.user.role === 'teacher') {
            this.router.navigate(['/teacher-dashboard']);
          } else if (res.user.role === 'student') {
            this.router.navigate(['/student-dashboard']);
          }
        },
        (err) => {
          // If any error occurs during signup
          console.error('Signup Error:', err);
          alert(
            'Signup failed. ' + (err.error?.message || 'Please try again.')
          );
        }
      );
    } catch (error) {
      // Catching any unexpected errors (rare in this context)
      console.error('Unexpected error:', error);
      alert('Something went wrong.');
    }
  }

  onGoogleSignup() {
    // In future — this will redirect to your backend Google OAuth route
    window.location.href = 'http://localhost:5000/api/auth/google'; // update when your Google API ready
  }
}
