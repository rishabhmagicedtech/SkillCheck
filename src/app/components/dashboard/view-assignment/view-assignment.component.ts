import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../../../services/dashboard/assignment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-view-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './view-assignment.component.html',
  styleUrl: './view-assignment.component.scss',
})
export class ViewAssignmentComponent {
  assignmentId = '';
  assignment: any = {
    title: '',
    technology: '',
    questions: [],
  };

  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    public router: Router
  ) {}

  ngOnInit() {
    this.assignmentId = this.route.snapshot.paramMap.get('id')!;
    this.loadAssignment();
  }

  loadAssignment() {
    this.assignmentService.getAssignmentById(this.assignmentId).subscribe({
      next: (res) => (this.assignment = res),
      error: (err) => console.error(err),
    });
  }

  addQuestion() {
    this.assignment.questions.push({
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    });
  }

  deleteQuestion(index: number) {
    this.assignment.questions.splice(index, 1);
  }

  saveChanges() {
    this.assignmentService
      .updateAssignment(this.assignmentId, this.assignment)
      .subscribe({
        next: () => {
          alert('Assignment updated!');
          this.router.navigate(['/teacher-dashboard']);
        },
        error: (err) => console.error(err),
      });
  }
}
