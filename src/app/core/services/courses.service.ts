import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { Course } from '../../modules/dashboard/pages/courses/models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = `${environment.baseApiUrl}/courses`; 

  constructor(private httpClient: HttpClient) {}

  getCourseDetail(id: string): Observable<Course> {
    return this.httpClient
      .get<Course>(`${this.apiUrl}/${id}?_embed=teachers`)
      .pipe(
        catchError(error => {
          console.error('Error fetching course detail:', error);
          throw error;
        })
      );
  }


  updateCourseById(id: string, data: { name: string }): Observable<Course[]> {
    return this.httpClient
      .patch<Course>(`${this.apiUrl}/${id}`, data)
      .pipe(
        concatMap(() => this.getCourses()),
        catchError(error => {
          console.error('Error updating course:', error);
          throw error;
        })
      );
  }

  addCourse(payload: { name: string }): Observable<Course[]> {
    return this.httpClient
      .post<Course>(this.apiUrl, payload)
      .pipe(
        concatMap(() => this.getCourses()),
        catchError(error => {
          console.error('Error adding course:', error);
          throw error;
        })
      );
  }

  getCourses(): Observable<Course[]> {
    const myHeaders = new HttpHeaders().append(
      'Authorization',
      localStorage.getItem('access_token') || ''
    );
    return this.httpClient.get<Course[]>(this.apiUrl, { headers: myHeaders }).pipe(
      catchError(error => {
        console.error('Error fetching courses:', error);
        throw error;
      })
    );
  }

  deleteCourseById(id: string): Observable<Course[]> {
    return this.httpClient
      .delete<Course>(`${this.apiUrl}/${id}`)
      .pipe(
        concatMap(() => this.getCourses()),
        catchError(error => {
          console.error('Error deleting course:', error);
          throw error;
        })
      );
  }
}