import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  isLoading = false;
  course: Course | null = null;
  errorMessage: string = '';

  constructor(
    private coursesService: CourseService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCourseDetail();
  }

  private loadCourseDetail(): void {
    this.isLoading = true;
    const courseId = this.activatedRoute.snapshot.params['id'];
    this.coursesService.getCourseDetail(courseId).subscribe({
      next: (course) => {
        this.course = course;
        this.errorMessage = ''; 
      },
      complete: () => {
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.handleError(error);
      },
    });
  }

  private handleError(error: HttpErrorResponse): void {
    if (error.status === 404) {
      this.errorMessage = 'El curso no existe';
    } else {
      this.errorMessage = 'Ocurrió un error inesperado';
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }
}