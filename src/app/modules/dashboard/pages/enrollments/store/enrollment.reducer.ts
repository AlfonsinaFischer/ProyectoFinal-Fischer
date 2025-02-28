import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../models';

export const enrollmentFeatureKey = 'enrollment';

export interface State {
  enrollments: Enrollment[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  enrollments: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  // 🔄 Cargar inscripciones
  on(EnrollmentActions.loadEnrollments, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, { data }) => ({
    ...state,
    enrollments: data,
    isLoading: false,
    error: null,
  })),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // ➕ Crear inscripción
  on(EnrollmentActions.createEnrollment, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(EnrollmentActions.createEnrollmentSuccess, (state, { data }) => ({
    ...state,
    enrollments: [...state.enrollments, data],
    isLoading: false,
    error: null,
  })),
  on(EnrollmentActions.createEnrollmentFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // ❌ Eliminar inscripción
  on(EnrollmentActions.deleteEnrollment, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(EnrollmentActions.deleteEnrollmentSuccess, (state, { id }) => ({
    ...state,
    enrollments: state.enrollments.filter((e) => e.id !== id),
    isLoading: false,
    error: null,
  })),
  on(EnrollmentActions.deleteEnrollmentFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // ✏️ Actualizar inscripción
  on(EnrollmentActions.updateEnrollment, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(EnrollmentActions.updateEnrollmentSuccess, (state, { data }) => ({
    ...state,
    enrollments: state.enrollments.map((e) =>
      e.id === data.id ? { ...e, ...data } : e
    ),
    isLoading: false,
    error: null,
  })),
  on(EnrollmentActions.updateEnrollmentFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  // 🔄 Resetear estado
  on(EnrollmentActions.resetState, () => initialState)
);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});