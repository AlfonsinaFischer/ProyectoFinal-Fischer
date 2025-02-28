import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudentsService } from '../../../../../core/services/students.service';
import { StudentActions } from './students actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class StudentsEffects {
  constructor(private actions$: Actions, private studentsService: StudentsService) {}

  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      mergeMap(() =>
        this.studentsService.getStudents().pipe(
          map((students) => StudentActions.loadStudentsSuccess({ students })),
          catchError((error) => of(StudentActions.loadStudentsFailure({ error })))
        )
      )
    )
  );

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.addStudent),
      mergeMap(({ student }) =>
        this.studentsService.addStudent(student).pipe(
          map(() => StudentActions.loadStudents()), 
          catchError((error) => of(StudentActions.loadStudentsFailure({ error })))
        )
      )
    )
  );

  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.updateStudent),
      mergeMap(({ student }) =>
        this.studentsService.updateStudent(student).pipe(
          map(() => StudentActions.loadStudents()),
          catchError((error) => of(StudentActions.loadStudentsFailure({ error })))
        )
      )
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.deleteStudent),
      mergeMap(({ id }) =>
        this.studentsService.deleteStudent(id).pipe(
          map(() => StudentActions.loadStudents()),
          catchError((error) => of(StudentActions.loadStudentsFailure({ error })))
        )
      )
    )
  );
}
