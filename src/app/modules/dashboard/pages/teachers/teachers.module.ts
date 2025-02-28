import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { teacherFeature } from './store/teachers.reducer';
import { TeacherEffects } from './store/teachers.effects';

@NgModule({
  imports: [
    CommonModule,
    TeachersRoutingModule,
    StoreModule.forFeature(teacherFeature), 
    EffectsModule.forFeature([TeacherEffects]),
    TeachersComponent
  ]
})
export class TeachersModule {}
