import { Routes } from '@angular/router';

// Import components
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TeacherDashboardComponent } from './components/dashboard/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './components/dashboard/student-dashboard/student-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { CreateAssignmentComponent } from './components/dashboard/create-assignment/create-assignment.component';
import { ViewAssignmentComponent } from './components/dashboard/view-assignment/view-assignment.component';
import { StudentAssignmentComponent } from './components/dashboard/student-assignment/student-assignment.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'teacher-dashboard',
    component: TeacherDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'teacher' },
  },
  {
    path: 'create-assignment',
    component: CreateAssignmentComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'teacher' },
  },
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'student' },
  },
  {
    path: 'view-assignment/:id',
    component: ViewAssignmentComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'teacher' },
  },
  {
    path: 'student/assignment/:id',
    component: StudentAssignmentComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 'student' },
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
