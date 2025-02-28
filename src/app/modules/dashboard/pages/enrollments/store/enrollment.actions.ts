import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment } from '../models';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    // 📌 Cargar inscripciones
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[] }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),

    // 📌 Crear inscripción
    'Create Enrollment': props<{ data: Omit<Enrollment, 'id'> }>(),
    'Create Enrollment Success': props<{ data: Enrollment }>(),
    'Create Enrollment Failure': props<{ error: unknown }>(),

    // 📌 Eliminar inscripción
    'Delete Enrollment': props<{ id: string }>(),
    'Delete Enrollment Success': props<{ id: string }>(),
    'Delete Enrollment Failure': props<{ error: unknown }>(),

    // 📌 Actualizar inscripción
    'Update Enrollment': props<{ data: Enrollment }>(),
    'Update Enrollment Success': props<{ data: Enrollment }>(),
    'Update Enrollment Failure': props<{ error: unknown }>(),

    // 📌 Resetear el estado
    'Reset State': emptyProps(),
  },
});
