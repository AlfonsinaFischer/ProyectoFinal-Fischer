import { Injectable } from '@angular/core';
import { LoginPayload } from '../../modules/auth/models';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../modules/dashboard/pages/users/models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../store/auth/auth.action';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { selectAuthUser } from '../../store/auth/auth.selectors';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  authUser$: Observable<User | null>;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private store: Store
  ) {
    this.authUser$ = this.store.select(selectAuthUser);
  }

  get isAdmin$(): Observable<boolean> {
    return this.authUser$.pipe(map((user) => user?.role?.toLowerCase() === 'admin'));
  }


  logout(): void {
    localStorage.removeItem('access_token');
    this.store.dispatch(AuthActions.unsetAuthUser());
    this.router.navigate(['auth', 'login']);
  }


  login(payload: LoginPayload, next?: () => void): void {
    this.httpClient
      .get<User[]>(
        `${environment.baseApiUrl}/users?email=${payload.email}&password=${payload.password}`
      )
      .pipe(
        catchError((err) => {
          this.handleError(err);
          return of([]);
        })
      )
      .subscribe({
        next: (usersResult) => {
          if (!usersResult[0]) {
            alert('Email o password inválidos');
          } else {

            localStorage.setItem('access_token', usersResult[0].accessToken);
            this.store.dispatch(AuthActions.setAuthUser({ user: usersResult[0] }));
            this.router.navigate(['dashboard', 'home']);
          }

          if (next) {
            next();
          }
        }
      });
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    if (!token) return of(false);

    return this.httpClient
      .get<User[]>(
        `${environment.baseApiUrl}/users?accessToken=${token}`
      )
      .pipe(
        map((res) => {
          const user = res[0];
          if (user) {
            this.store.dispatch(AuthActions.setAuthUser({ user }));
          }
          return !!user;
        }),
        catchError((err) => {
          this.handleError(err);
          return of(false);
        })
      );
  }


  private handleError(err: any): void {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        alert('El servidor está caído. Por favor, intente más tarde.');
      } else {
        alert(`Error: ${err.status} - ${err.message}`);
      }
    } else {
      alert('Error desconocido');
    }
  }
}

