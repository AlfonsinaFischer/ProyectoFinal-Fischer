import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { StoreModule } from '@ngrx/store';
import { userFeature } from './store/user.reducer';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,    
    MatIconModule,
    MatListModule,
    UsersRoutingModule,
    StoreModule.forFeature(userFeature),
    EffectsModule.forFeature([]),
  ],
})
export class UsersModule {}
