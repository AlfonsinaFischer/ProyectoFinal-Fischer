import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentActions } from './students actions';
import { Student } from '../models';

export const studentsFeatureKey = 'students';

export interface State {
  students: Student[];
  teachers: any[]; 
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  students: [],
  teachers: [], 
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(StudentActions.loadStudents, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StudentActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students,
    loading: false,
  })),
  on(StudentActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(StudentActions.addStudent, (state, { student }) => ({
    ...state,
    students: [...state.students, student],
  })),
  on(StudentActions.updateStudent, (state, { student }) => ({
    ...state,
    students: state.students.map((s) =>
      s.id === student.id ? { ...s, ...student } : s
    ),
  })),
  on(StudentActions.deleteStudent, (state, { id }) => ({
    ...state,
    students: state.students.filter((s) => s.id !== id),
  }))
);

export const studentsFeature = createFeature({
  name: studentsFeatureKey,
  reducer,
});