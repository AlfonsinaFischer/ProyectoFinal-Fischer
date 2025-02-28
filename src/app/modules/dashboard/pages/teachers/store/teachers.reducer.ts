import { createFeature, createReducer, on } from '@ngrx/store';
import { TeacherActions } from './teachers actions';
import { User } from '../../users/models';

export const teacherFeatureKey = 'teachers';

export interface State {
  teachers: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  teachers: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(TeacherActions.loadTeachers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(TeacherActions.loadTeachersSuccess, (state, { teachers }) => ({
    ...state,
    teachers,
    loading: false,
  })),
  on(TeacherActions.loadTeachersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const teacherFeature = createFeature({
  name: teacherFeatureKey,
  reducer,
});