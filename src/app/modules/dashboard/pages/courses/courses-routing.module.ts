import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './pages/course-detail/course-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    data: { title: 'Cursos' }, 
  },
  {

    path: ':id',
    component: CourseDetailComponent,
    data: { title: 'Detalles del Curso' }, 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}