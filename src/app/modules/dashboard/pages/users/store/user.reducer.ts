import { createFeature, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User } from '../models';

export const userFeatureKey = 'users';

export interface State {
  users: User[];
  teachers: User[];  // Agregado para manejar profesores
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  users: [],
  teachers: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  // Cargar usuarios
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Eliminar usuario
  on(UserActions.deleteUserById, (state, { id }) => ({
    ...state,
    users: state.users.filter(user => user.id !== id),
  })),

  // Resetear estado
  on(UserActions.resetState, () => initialState),

  // Cargar profesores
  on(UserActions.loadTeachers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.loadTeachersSuccess, (state, { teachers }) => ({
    ...state,
    teachers,
    loading: false,
  })),
  on(UserActions.loadTeachersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(UserActions.grantPermissionToTeacher, (state, { teacherId, permission }) => ({
    ...state,
    users: state.users.map(user =>
      user.id === teacherId ? { ...user, role: permission as 'admin' | 'student' | 'teacher' } : user
    ),
  }))
);

export const userFeature = createFeature({
  name: userFeatureKey,
  reducer,
});
