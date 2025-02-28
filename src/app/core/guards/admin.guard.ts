import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authUser$.pipe(
    map((authUser) => {
      // Si el usuario no está autenticado, redirigir al login
      if (!authUser) {
        return router.createUrlTree(['auth', 'login']);
      }

      // Si el usuario es un ADMIN, permitir el acceso
      if (authUser.role === 'admin') {
        return true;
      }

      // Si el usuario no es un ADMIN, redirigir al home
      return router.createUrlTree(['dashboard', 'home']);
    }),
    catchError((error) => {
      // En caso de error, redirigir al login
      console.error('[adminGuard] Error:', error);
      return of(router.createUrlTree(['auth', 'login']));
    })
  );
};
