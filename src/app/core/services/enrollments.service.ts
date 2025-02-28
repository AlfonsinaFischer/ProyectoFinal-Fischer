import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../../modules/dashboard/pages/enrollments/models';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EnrollmentsService {
  private apiUrl = `${environment.baseApiUrl}/enrollments`; 

  constructor(private httpClient: HttpClient) {}


  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching enrollments:', error);
        throw error;
      })
    );
  }


  createEnrollment(data: Omit<Enrollment, 'id'>): Observable<Enrollment> {
    return this.httpClient.post<Enrollment>(this.apiUrl, data).pipe(
      catchError(error => {
        console.error('Error creating enrollment:', error);
        throw error;
      })
    );
  }

  updateEnrollment(data: Enrollment): Observable<Enrollment> {
    return this.httpClient.put<Enrollment>(`${this.apiUrl}/${data.id}`, data).pipe(
      catchError(error => {
        console.error('Error updating enrollment:', error);
        throw error;
      })
    );
  }


  deleteEnrollment(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting enrollment:', error);
        throw error;
      })
    );
  }
}
