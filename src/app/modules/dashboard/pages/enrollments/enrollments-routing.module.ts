import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentsComponent } from './enrollments.component';
import { authGuard } from '../../../../core/guards/auth.guard'; 

const routes: Routes = [
  {
    path: '',
    component: EnrollmentsComponent,
    canActivate: [authGuard], 
  },
  {
    path: 'edit/:id', 
    component: EnrollmentsComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnrollmentsRoutingModule {}
