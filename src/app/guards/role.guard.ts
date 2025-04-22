import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { SessionService } from '../services/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const expectedRole = route.data['expectedRole'];

    return this.sessionService.checkSession().pipe(
      map((res) => {
        if (!res.valid) {
          alert('Please login first.');
          return this.router.createUrlTree(['/login']);
        }

        if (res.role !== expectedRole) {
          alert('Access denied.');
          // Optional redirect based on role
          return res.role === 'teacher'
            ? this.router.createUrlTree(['/teacher-dashboard'])
            : this.router.createUrlTree(['/student-dashboard']);
        }

        return true;
      }),
      catchError(() => {
        alert('Please login first.');
        return of(this.router.createUrlTree(['/login']));
      })
    );
  }
}
