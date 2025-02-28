import { Component, OnDestroy, OnInit, NgModule } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './models';
import { selectUsers } from './store/user.selectors';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;

  constructor(private usersService: UsersService, private store: Store) {
    this.users$ = this.store.select(selectUsers);
  }

  ngOnDestroy(): void {
    this.usersService.resetUserState();
  }

  ngOnInit(): void {
    this.usersService.loadUsers();
  }

  // Función de confirmación antes de eliminar
  confirmDelete(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.deleteUserById(id);
    }
  }

  deleteUserById(id: string) {
    this.usersService.deleteUserById(id);
  }
}

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    // other imports
  ]
})
export class UsersModule { }


