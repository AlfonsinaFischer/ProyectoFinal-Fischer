import { createReducer, on } from '@ngrx/store';
import { User } from '../../modules/dashboard/pages/users/models/index'; 
import { AuthActions } from './auth.action';

export const authFeatureKey = 'auth';

export interface AuthState {
  authUser: User | null; 
}

const initialState: AuthState = {
  authUser: null,  
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setAuthUser, (state, action) => ({
    ...state,
    authUser: action.user,  
  })),
  on(AuthActions.unsetAuthUser, (state) => ({
    ...state,
    authUser: null,  
  }))
);