import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EnrollmentActions } from './enrollment.actions';
import { EnrollmentsService } from '../../../../../core/services/enrollments.service';

@Injectable()
export class EnrollmentEffects {
  private actions$ = inject(Actions);
  private enrollmentsService = inject(EnrollmentsService);

  // 📌 Cargar inscripciones
  loadEnrollments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.loadEnrollments),
      concatMap(() =>
        this.enrollmentsService.getEnrollments().pipe(
          map((enrollments) =>
            EnrollmentActions.loadEnrollmentsSuccess({ data: enrollments })
          ),
          catchError((error) =>
            of(EnrollmentActions.loadEnrollmentsFailure({ error }))
          )
        )
      )
    )
  );

  // 📌 Crear inscripción
  createEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.createEnrollment),
      concatMap(({ data }) =>
        this.enrollmentsService.createEnrollment(data).pipe(
          map((enrollment) =>
            EnrollmentActions.createEnrollmentSuccess({ data: enrollment })
          ),
          catchError((error) =>
            of(EnrollmentActions.createEnrollmentFailure({ error }))
          )
        )
      )
    )
  );

  // 📌 Eliminar inscripción
  deleteEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.deleteEnrollment),
      concatMap(({ id }: { id: number | string }) =>
        this.enrollmentsService.deleteEnrollment(Number(id)).pipe(
          map(() => EnrollmentActions.deleteEnrollmentSuccess({ id: String(id) })),
          catchError((error) =>
            of(EnrollmentActions.deleteEnrollmentFailure({ error }))
          )
        )
      )
    )
  );

  // 📌 Actualizar inscripción
  updateEnrollment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EnrollmentActions.updateEnrollment),
      concatMap(({ data }) =>
        this.enrollmentsService.updateEnrollment(data).pipe(
          map((updatedEnrollment) =>
            EnrollmentActions.updateEnrollmentSuccess({ data: updatedEnrollment })
          ),
          catchError((error) =>
            of(EnrollmentActions.updateEnrollmentFailure({ error }))
          )
        )
      )
    )
  );
}