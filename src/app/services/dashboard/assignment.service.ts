import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private apiUrl = 'http://localhost:5000/api/assignments';

  constructor(private http: HttpClient) {}

  createAssignment(data: any) {
    return this.http.post(`${this.apiUrl}/create`, data, {
      withCredentials: true,
    });
  }

  getMyAssignments() {
    return this.http.get<any[]>(`${this.apiUrl}/teacher`, {
      withCredentials: true,
    });
  }

  getAssignmentById(id: any) {
    return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  getStudentAssignments() {
    return this.http.get(`${this.apiUrl}/student`, { withCredentials: true });
  }

  deleteAssignment(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
  }
  updateAssignment(id: string, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, {
      withCredentials: true,
    });
  }
}
