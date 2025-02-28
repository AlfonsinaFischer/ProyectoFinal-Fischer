import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TeachersService } from '../../../../../core/services/teacher.service';
import { TeacherActions } from './teachers actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class TeacherEffects {
  constructor(private actions$: Actions, private teachersService: TeachersService) {}

  loadTeachers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TeacherActions.loadTeachers),
      mergeMap(() =>
        this.teachersService.getTeachers().pipe(
          map((teachers) => TeacherActions.loadTeachersSuccess({ teachers })),
          catchError((error) => of(TeacherActions.loadTeachersFailure({ error })))
        )
      )
    )
  );
}