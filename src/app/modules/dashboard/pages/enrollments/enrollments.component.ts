import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EnrollmentActions } from './store/enrollment.actions';
import { forkJoin, Observable } from 'rxjs';
import { Enrollment } from './models';
import {
  selectEnrollments,
  selectEnrollmentsError,
  selectIsLoadingEnrollments,
} from './store/enrollment.selectors';
import { Course } from '../courses/models';
import { User } from '../users/models';
import { CourseService } from '../../../../core/services/courses.service';
import { UsersService } from '../../../../core/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class EnrollmentsComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
  }
  enrollments$: Observable<Enrollment[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<unknown>;

  courses: Course[] = [];
  students: User[] = [];

  enrollmentForm: FormGroup;

  constructor(
    private store: Store,
    private coursesService: CourseService,
    private usersService: UsersService,
    private fb: FormBuilder
  ) {
    this.enrollments$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectIsLoadingEnrollments);
    this.error$ = this.store.select(selectEnrollmentsError);
    this.enrollments$ = this.store.select(selectEnrollments);
    this.isLoading$ = this.store.select(selectIsLoadingEnrollments);
    this.error$ = this.store.select(selectEnrollmentsError);

    this.enrollmentForm = this.fb.group({
      studentId: [null, Validators.required],
      courseId: [null, Validators.required],
    });
    this.store.dispatch(EnrollmentActions.loadEnrollments());
    this.loadStudentsAndCourses();
  }

  ngOnDestroy(): void {
    this.store.dispatch(EnrollmentActions.resetState());
  }

  private loadStudentsAndCourses(): void {
    forkJoin({
      courses: this.coursesService.getCourses(),
      students: this.usersService.getStudentUsers(),
    }).subscribe({
      next: ({ courses, students }) => {
        this.courses = courses;
        this.students = students;
      },
      error: (err) => console.error('Error cargando datos:', err),
    });
  }

  onSubmit(): void {
    if (this.enrollmentForm.invalid) {
      this.enrollmentForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(
      EnrollmentActions.createEnrollment({ data: this.enrollmentForm.value })
    );
    this.enrollmentForm.reset();
  }
}
