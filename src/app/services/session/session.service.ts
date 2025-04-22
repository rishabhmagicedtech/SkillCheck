import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  checkSession(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/check-session`, {
      withCredentials: true,
    });
  }
}
