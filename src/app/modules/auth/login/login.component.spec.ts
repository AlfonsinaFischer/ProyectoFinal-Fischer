import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SharedModule } from '../../../shared/shared.module';
import { Validators } from '@angular/forms';
import { MockProvider } from 'ng-mocks';
import { AuthService } from '../../../core/services/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let loginComponent: LoginComponent;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule],
      providers: [MockProvider(AuthService)],
    }).compileComponents();

    loginComponent = TestBed.createComponent(LoginComponent).componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('debe instanciar el LoginComponent', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('email y password deben ser requeridos en loginForm', () => {
    const emailControl = loginComponent.loginForm.get('email');
    const passwordControl = loginComponent.loginForm.get('password');

    expect(emailControl?.hasValidator(Validators.required)).toBeTrue();
    expect(passwordControl?.hasValidator(Validators.required)).toBeTrue();
  });

  it('Si el formulario es inválido, debe marcar todos los campos como tocados', () => {
    loginComponent.loginForm.setValue({ email: '', password: '' });

    const spyMarkAllAsTouched = spyOn(
      loginComponent.loginForm,
      'markAllAsTouched'
    ).and.callThrough();

    loginComponent.onSubmit();
    
    expect(spyMarkAllAsTouched).toHaveBeenCalled();
  });

  it('Si el formulario es válido, debe llamar a login de AuthService', () => {
    loginComponent.loginForm.setValue({ email: 'email@mail.com', password: '123456' });
    
    const spyOnLogin = spyOn(authService, 'login').and.returnValue(of({}));

    loginComponent.onSubmit();

    expect(spyOnLogin).toHaveBeenCalledTimes(1);
  });

  it('Si el login falla, debe mostrar un mensaje de error', () => {
    loginComponent.loginForm.setValue({ email: 'email@mail.com', password: '123456' });

    const spyOnLogin = spyOn(authService, 'login').and.returnValue(
      throwError(() => new Error('Error al iniciar sesión')).subscribe()
    );

    loginComponent.onSubmit();

    expect(loginComponent.loginError).toBe('Error al iniciar sesión');
    expect(spyOnLogin).toHaveBeenCalledTimes(1);
  });

  it('Debe mostrar el indicador de carga mientras se procesa el login', () => {
    loginComponent.loginForm.setValue({ email: 'email@mail.com', password: '123456' });

    const spyOnLogin = spyOn(authService, 'login').and.returnValue(of({}));

    loginComponent.onSubmit();

    expect(loginComponent.isLoading).toBeFalse();
    expect(spyOnLogin).toHaveBeenCalled();
  });
});