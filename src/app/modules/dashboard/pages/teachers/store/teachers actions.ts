import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../users/models';

export const TeacherActions = createActionGroup({
  source: 'Teacher',
  events: {
    'Load Teachers': emptyProps(),
    'Load Teachers Success': props<{ teachers: User[] }>(),
    'Load Teachers Failure': props<{ error: any }>(),
    'Grant Permission': props<{ teacherId: string; permission: string }>(),
  },
});