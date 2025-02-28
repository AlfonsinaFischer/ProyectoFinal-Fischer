import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentsService } from '../../../../core/services/students.service';
import { Student } from './models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'actions']; 
  students: Student[] = [];
  isLoading = false;
  hasError = false;
  studentsSubscription?: Subscription;

  constructor(private studentsService: StudentsService) {}

  ngOnDestroy(): void {
    this.studentsSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentsSubscription = this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.isLoading = false;
        this.hasError = false;
      },
      error: (error) => {
        console.error('Error al cargar estudiantes:', error);
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
