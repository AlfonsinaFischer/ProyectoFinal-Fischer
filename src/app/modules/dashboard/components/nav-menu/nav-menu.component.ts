import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  linkItems = [
    { label: 'Inicio', routerLink: '/home' },
    { label: 'Estudiantes', routerLink: '/students' },
    { label: 'Cursos', routerLink: '/courses' },
    { label: 'Usuarios', routerLink: '/users' },
  ] as const; 

  trackByFn(index: number, item: any): number {
    return index;
  }

  constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }
}