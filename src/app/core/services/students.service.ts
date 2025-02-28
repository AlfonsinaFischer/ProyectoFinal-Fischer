import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Student } from '../../modules/dashboard/pages/students/models';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private apiUrl = `${environment.baseApiUrl}/students`; 
  constructor(private httpClient: HttpClient) {}


  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching students:', error);
        throw error;
      })
    );
  }


  addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.apiUrl, student).pipe(
      catchError(error => {
        console.error('Error adding student:', error);
        throw error;
      })
    );
  }


  updateStudent(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${this.apiUrl}/${student.id}`, student).pipe(
      catchError(error => {
        console.error('Error updating student:', error);
        throw error;
      })
    );
  }


  deleteStudent(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting student:', error);
        throw error;
      })
    );
  }


  getRoles(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${environment.baseApiUrl}/roles`).pipe(
      catchError(error => {
        console.error('Error fetching roles:', error);
        throw error;
      })
    );
  }
}