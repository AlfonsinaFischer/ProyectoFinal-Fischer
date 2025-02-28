import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../modules/dashboard/pages/users/models';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  private apiUrl = `${environment.baseApiUrl}/users`;

  constructor(private httpClient: HttpClient) {}


  getTeachers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}?role=TEACHER`).pipe(
      catchError(error => {
        console.error('Error fetching teachers:', error);
        throw error;
      })
    );
  }


  grantPermission(teacherId: string, permission: string): Observable<User> {
    return this.httpClient.patch<User>(`${this.apiUrl}/${teacherId}`, {
      permissions: [permission],
    }).pipe(
      catchError(error => {
        console.error(`Error granting permission to teacher ${teacherId}:`, error);
        throw error;
      })
    );
  }
}