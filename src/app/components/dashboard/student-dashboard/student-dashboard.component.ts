import { Component } from '@angular/core';
import { AssignmentService } from '../../../services/dashboard/assignment.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss',
})
export class StudentDashboardComponent {
  assignments: any[] = [];
  constructor(
    public router: Router,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit() {
    this.loadAssignments();
  }

  loadAssignments() {
    this.assignmentService.getStudentAssignments().subscribe({
      next: (res: any) => (this.assignments = res),
      error: (err) => console.error(err),
    });
  }
  viewAssignment(id: string) {
    this.router.navigate(['/student/assignment', id]);
  }
}
