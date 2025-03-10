
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authGuard } from './core/guards/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([/* routes */]), 
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    { provide: 'authGuard', useValue: authGuard }
    ]
  }