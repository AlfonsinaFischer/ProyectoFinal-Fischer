import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('[authGuard] Se disparó authGuard');

  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isAuthenticated().pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        return router.createUrlTree(['auth', 'login']);
      }
      return true;
    }),
    catchError((error) => {

      console.error('[authGuard] Error de autenticación:', error);
      return of(router.createUrlTree(['auth', 'login']));
    })
  );
};

