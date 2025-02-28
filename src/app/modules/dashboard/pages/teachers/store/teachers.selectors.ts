import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './teachers.reducer';

export const selectTeacherState = createFeatureSelector<State>('teachers');

export const selectAllTeachers = createSelector(
  selectTeacherState,
  (state) => state.teachers
);

export const selectLoading = createSelector(
  selectTeacherState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectTeacherState,
  (state) => state.error
);