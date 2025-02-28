import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { environment } from '../../../environments/environment';
import { User } from '../../modules/dashboard/pages/users/models';

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;
  let httpTestingController: HttpTestingController;
  let store: MockStore;

  const initialState = {
    auth: {
      authUser: null,
      permissions: ['read', 'write'], 
      permission1: ['read', 'write'], 
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        MockProvider(Router),
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    localStorage.clear();
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
    store = TestBed.inject(MockStore);
  });

  it('AuthService debe instanciarse', () => {
    expect(authService).toBeTruthy();
  });

  it('Un login satisfactorio debe establecer el usuario autenticado, el token en localStorage y redirigir al home', () => {
    const spyOnNavigate = spyOn(router, 'navigate');
    const fakeLoginData = { email: 'admin@email.com', password: '123456' };
    const mockResponse: User[] = [
      {
        id: 'sdsad',
        accessToken: 'asdasdasdas',
        email: 'asdasdas@mail.com',
        name: 'fake_user',
        password: '123456',
        role: 'admin',
        permissions: ['read', 'write'],
      },
    ];

    authService.login(fakeLoginData, () => {
      expect(localStorage.getItem('access_token')).toBeTruthy();
      expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home']);
    });

    httpTestingController
      .expectOne({
        method: 'GET',
        url: `${environment.baseApiUrl}/users?email=${fakeLoginData.email}&password=${fakeLoginData.password}`,
      })
      .flush(mockResponse);
  });

  it('Un login incorrecto debe mostrar una alerta con el mensaje "Email o password inválidos"', () => {
    const spyOnAlert = spyOn(window, 'alert');
    const fakeLoginData = { email: 'admin@email.com', password: '123456' };
    const mockResponse: User[] = [];

    authService.login(fakeLoginData, () => {
      expect(spyOnAlert).toHaveBeenCalledWith('Email o password inválidos');
    });

    httpTestingController
      .expectOne({
        method: 'GET',
        url: `${environment.baseApiUrl}/users?email=${fakeLoginData.email}&password=${fakeLoginData.password}`,
      })
      .flush(mockResponse);
  });

  it('Debería verificar si el usuario está autenticado', () => {
    const fakeToken = 'some_valid_token';
    localStorage.setItem('access_token', fakeToken);
    
    const mockUser: User[] = [
      {
        id: 'sdsad',
        accessToken: fakeToken,
        email: 'admin@email.com',
        name: 'Fake User',
        password: '123456',
        role: 'admin',
        permissions: []
      },
    ];

    authService.isAuthenticated().subscribe((isAuthenticated) => {
      expect(isAuthenticated).toBe(true);
    });


    httpTestingController
      .expectOne({
        method: 'GET',
        url: `${environment.baseApiUrl}/users?accessToken=${fakeToken}`,
      })
      .flush(mockUser);
  });

  it('Debería manejar el error en caso de fallo en la autenticación', () => {
    const spyOnAlert = spyOn(window, 'alert');
    const fakeLoginData = { email: 'admin@email.com', password: '123456' };
    const mockErrorResponse = { status: 500, statusText: 'Internal Server Error' };

    authService.login(fakeLoginData, () => {
      expect(spyOnAlert).toHaveBeenCalledWith('Error: 500 - Internal Server Error');
    });

    httpTestingController
      .expectOne({
        method: 'GET',
        url: `${environment.baseApiUrl}/users?email=${fakeLoginData.email}&password=${fakeLoginData.password}`,
      })
      .flush(null, mockErrorResponse);
  });
});
