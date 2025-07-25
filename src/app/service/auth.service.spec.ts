import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform login', () => {
    const dummyCredentials = {
      email: 'mateo@gmail.com',
      password: '1234562'
    };

    service.loginUser(dummyCredentials).then(response => {
      expect(response).toEqual({ token: 'abc123' }); // ajusta según respuesta real
    });

    const req = httpMock.expectOne('https://music.fly.dev/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'abc123' }); // simulación de respuesta exitosa

    httpMock.verify();
  });
});
