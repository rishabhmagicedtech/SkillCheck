import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterLink],
  standalone: true,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(public router: Router, private authService: AuthService) {}

  // Regular email/password login
  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    try {
      this.authService.login(loginData).subscribe(
        (res) => {
          if (res.user.role === 'teacher') {
            this.router.navigate(['/teacher-dashboard']);
          } else if (res.user.role === 'student') {
            this.router.navigate(['/student-dashboard']);
          }
        },
        (err) => {
          console.error('Login Error:', err);
          alert('Login failed. ' + (err.error?.message || 'Please try again.'));
        }
      );
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Something went wrong.');
    }
  }

  // Google login placeholder handler
  // onGoogleLogin() {
  //   // In future — this will redirect to your backend Google OAuth route
  //   window.location.href = 'http://localhost:5000/api/auth/google'; // update when your Google API ready
  // }
}
