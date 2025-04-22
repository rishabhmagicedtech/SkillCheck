import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  private baseUrl = 'http://localhost:5000/api/submissions';
  private apiUrl = 'http://localhost:5000/api/assignments';
  constructor(private http: HttpClient) {}

  submitAssignment(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data, { withCredentials: true });
  }

  getAssignmentById(id: any) {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
}
