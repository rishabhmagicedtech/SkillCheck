import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../../../services/dashboard/assignment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';
import { SubmissionService } from '../../../services/dashboard/submission.service';

@Component({
  selector: 'app-student-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './student-assignment.component.html',
  styleUrl: './student-assignment.component.scss',
})
export class StudentAssignmentComponent {
  assignment: any = {
    title: '',
    technology: '',
    questions: [],
  };
  assignmentId = '';
  studentAnswers: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private submissionService: SubmissionService,
    public router: Router
  ) {}

  ngOnInit() {
    this.assignmentId = this.route.snapshot.paramMap.get('id')!;
    this.loadAssignment();
  }

  loadAssignment() {
    this.submissionService.getAssignmentById(this.assignmentId).subscribe({
      next: (res) => {
        this.assignment = res;
        this.studentAnswers = new Array(this.assignment.questions.length).fill(
          -1
        );
      },
      error: (err) => console.error(err),
    });
  }

  submitAssignment() {
    const submission = {
      assignmentId: this.assignmentId,
      answers: this.studentAnswers,
    };

    this.submissionService.submitAssignment(submission).subscribe({
      next: () => {
        alert('Assignment submitted successfully!');
        this.router.navigate(['/student-dashboard']);
      },
      error: (err) => console.error(err),
    });
  }
}
