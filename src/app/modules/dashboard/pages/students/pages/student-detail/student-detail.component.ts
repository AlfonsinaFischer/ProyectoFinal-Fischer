import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.component.html',
})
export class StudentDetailComponent implements OnInit {
  studentId: string = '';
  fullName: string = '';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.studentId = this.activatedRoute.snapshot.params['id'];

    const name = this.activatedRoute.snapshot.queryParams['name'] || 'Nombre no disponible';
    const lastName = this.activatedRoute.snapshot.queryParams['lastName'] || 'Apellido no disponible';

    this.fullName = `${name} ${lastName}`;
  }
}