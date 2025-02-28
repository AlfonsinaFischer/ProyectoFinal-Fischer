import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { UserActions } from '../../modules/dashboard/pages/users/store/user.actions';
import { environment } from '../../../environments/environment';
import { User } from '../../modules/dashboard/pages/users/models';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl = `${environment.baseApiUrl}/users`;

  constructor(private httpClient: HttpClient, private store: Store) {}


  getStudentUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}?role=STUDENT`).pipe(
      catchError(error => {
        console.error('Error fetching student users:', error);
        throw error;
      })
    );
  }


  deleteUserById(id: string): void {
    this.store.dispatch(UserActions.deleteUserById({ id }));
  }

  resetUserState(): void {
    this.store.dispatch(UserActions.resetState());
  }


  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching all users:', error);
        throw error;
      })
    );
  }


  loadUsers(): void {
    this.getUsers().pipe(
      map(users => {
        this.store.dispatch(UserActions.loadUsersSuccess({ users }));
      }),
      catchError(error => {
        console.error('Error loading users:', error);
        throw error;
      })
    ).subscribe();
  }
}
