import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/services/courses.service';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { CourseFormDialogComponent } from './components/course-form-dialog/course-form-dialog.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'], 
})
export class CoursesComponent implements OnInit {
  isLoading = false;
  dataSource: Course[] = [];
  isAdmin$: Observable<boolean>;

  constructor(
    private courseService: CourseService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {
    this.isAdmin$ = this.authService.isAdmin$;
  }

  handleCoursesUpdate(courses: Course[]): void {
    this.dataSource = [...courses]; 
  }

  openFormDialog(editingCourse?: Course): void {
    if (editingCourse) {
      console.log('Se va a editar: ', editingCourse); 
    }

    this.matDialog
      .open(CourseFormDialogComponent, { data: { editingCourse } })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          if (editingCourse) {
            this.updateCourse(editingCourse.id, data); 
          } else {
            this.addCourse(data); 
          }
        }
      });
  }

  updateCourse(id: string, data: { name: string }): void {
    this.isLoading = true;
    this.courseService.updateCourseById(id, data).subscribe({
      next: (updatedCourses) => this.handleCoursesUpdate(updatedCourses),
      error: () => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  addCourse(data: { name: string }): void {
    this.isLoading = true;
    this.courseService.addCourse(data).subscribe({
      next: (newCourses) => this.handleCoursesUpdate(newCourses),
      error: () => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.handleCoursesUpdate(courses);
      },
      error: () => (this.isLoading = false),
      complete: () => (this.isLoading = false),
    });
  }

  onDelete(id: string): void {
    if (confirm('¿Está seguro de que desea eliminar este curso?')) {
      this.isLoading = true;
      this.courseService.deleteCourseById(id).subscribe({
        next: (updatedCourses) => this.handleCoursesUpdate(updatedCourses),
        error: () => (this.isLoading = false),
        complete: () => (this.isLoading = false),
      });
    }
  }
}