import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, catchError, of } from 'rxjs';
import { SessionService } from '../services/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.sessionService.checkSession().pipe(
      map((res) => {
        if (res.valid) {
          return true;
        } else {
          alert('Please login to continue.');
          return this.router.createUrlTree(['/login']);
        }
      }),
      catchError(() => {
        alert('Please login to continue.');
        return of(this.router.createUrlTree(['/login']));
      })
    );
  }
}
