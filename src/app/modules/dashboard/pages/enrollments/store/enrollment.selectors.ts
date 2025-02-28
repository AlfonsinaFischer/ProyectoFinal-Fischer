import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollment from './enrollment.reducer';

export const selectEnrollmentState =
  createFeatureSelector<fromEnrollment.State>(fromEnrollment.enrollmentFeatureKey);

export const selectEnrollments = createSelector(
  selectEnrollmentState,
  (state) => state.enrollments
);

export const selectIsLoadingEnrollments = createSelector(
  selectEnrollmentState,
  (state) => state.isLoading
);

export const selectEnrollmentsError = createSelector(
  selectEnrollmentState,
  (state) => state.error
);


export const selectEnrollmentById = (id: string) =>
  createSelector(selectEnrollments, (enrollments) =>
    enrollments.find((enrollment) => enrollment.id === id) || null
  );


export const selectEnrollmentsByStudentId = (studentId: string) =>
  createSelector(selectEnrollments, (enrollments) =>
    enrollments.filter((enrollment) => enrollment.studentId === studentId)
  );


export const selectEnrollmentsByCourseId = (courseId: string) =>
  createSelector(selectEnrollments, (enrollments) =>
    enrollments.filter((enrollment) => enrollment.courseId === courseId)
  );
