import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, catchError } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import { UserActions } from './user.actions';
import { UsersService } from '../../../../../core/services/users.service'; 

@Injectable()
export class UserEffects {


  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers), 
      concatMap(() =>
        this.usersService.getUsers().pipe(  
          map((users) => UserActions.loadUsersSuccess({ users })),  
          catchError((error) => of(UserActions.loadUsersFailure({ error })))  
        )
      )
    );
  });


  constructor(
    private actions$: Actions, 
    private usersService: UsersService  
  ) {}
}