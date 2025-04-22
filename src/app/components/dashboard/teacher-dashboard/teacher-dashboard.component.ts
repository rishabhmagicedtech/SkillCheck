import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../../services/dashboard/assignment.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterModule, RouterLink],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.scss',
})
export class TeacherDashboardComponent implements OnInit {
  assignments: any[] = [];

  constructor(
    private assignmentService: AssignmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAssignments();
  }

  loadAssignments() {
    this.assignmentService.getMyAssignments().subscribe({
      next: (res) => (this.assignments = res),
      error: (err) => console.error(err),
    });
  }

  deleteAssignment(id: string) {
    this.assignmentService.deleteAssignment(id).subscribe({
      next: () => this.loadAssignments(),
      error: (err) => console.error(err),
    });
  }

  // viewAssignment(id: string) {
  //   this.router.navigate(['/assignment', id]);
  // }

  viewAssignment(id: string) {
    this.router.navigate(['/view-assignment', id]);
  }
}
