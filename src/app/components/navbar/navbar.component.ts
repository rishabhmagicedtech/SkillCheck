import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}
  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear(); // or sessionStorage if you used it
        this.router.navigate(['/login']);
      },
      error: (err) => console.error(err),
    });
  }
}
