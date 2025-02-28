import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../models';

export const StudentActions = createActionGroup({
  source: 'Student',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ students: Student[] }>(),
    'Load Students Failure': props<{ error: any }>(),
    'Add Student': props<{ student: Student }>(),
    'Update Student': props<{ student: Student }>(),
    'Delete Student': props<{ id: string }>(),
  },
});