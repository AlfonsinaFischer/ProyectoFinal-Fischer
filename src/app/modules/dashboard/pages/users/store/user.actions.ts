import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: User[] }>(),
    'Load Users Failure': props<{ error: any }>(),

    'Delete User By Id': props<{ id: string }>(),  
    'Reset State': emptyProps(),

    'Grant Permission To Teacher': props<{ teacherId: string, permission: string }>(),
    'Grant Permission To Teacher Success': emptyProps(),
    'Grant Permission To Teacher Failure': props<{ error: any }>(),

    'Load Teachers': emptyProps(),
    'Load Teachers Success': props<{ teachers: User[] }>(),
    'Load Teachers Failure': props<{ error: any }>(),
  },
});