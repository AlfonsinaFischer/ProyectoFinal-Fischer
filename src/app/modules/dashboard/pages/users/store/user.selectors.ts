import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.State>('users');

export const selectUsers = createSelector(
  selectUserState,
  (state: fromUser.State) => state.users
);

export const selectUserById = (userId: string) =>
  createSelector(selectUserState, (state: fromUser.State) =>
    state.users.find(user => user.id === userId)
  );

export const selectLoading = createSelector(
  selectUserState,
  (state: fromUser.State) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state: fromUser.State) => state.error
);

