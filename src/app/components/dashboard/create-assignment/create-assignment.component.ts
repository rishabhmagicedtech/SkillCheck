import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignmentService } from '../../../services/dashboard/assignment.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-create-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterLink],
  templateUrl: './create-assignment.component.html',
  styleUrl: './create-assignment.component.scss',
})
export class CreateAssignmentComponent {
  title = '';
  technology = '';
  questions = [
    { questionText: '', options: ['', '', '', ''], correctAnswer: 0 },
  ];

  constructor(
    private assignmentService: AssignmentService,
    private router: Router
  ) {}

  addQuestion() {
    this.questions.push({
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    });
  }

  createAssignment() {
    const payload = {
      title: this.title,
      technology: this.technology,
      questions: this.questions,
    };

    this.assignmentService.createAssignment(payload).subscribe({
      next: () => {
        alert('Assignment created!');
        this.router.navigate(['/teacher-dashboard']);
      },
      error: (err) => console.error(err),
    });
  }
}
